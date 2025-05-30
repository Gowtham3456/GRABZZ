const express=require("express");
const Cart=require("../models/Cart");
const Product=require("../models/Product");
const {protect}=require("../middleware/authMiddleware");

const router=express.Router();

//heleper function to get cart by userid or guestid
const getCart=async(userId,guestId)=>{
    if(userId){
        return await Cart.findOne({user:userId});
    }else if(guestId){
        return await Cart.findOne({guestId});
    }
    return null;
}

//Add the product to the cart
//@route POST/api/cart
//desc ADD a product to the cart for guest or logginin user
//@acces public

router.post("/",async(req,res)=>{
    const {productId,
            quantity,
            size,
            color,
            guestId,
            userId
    }=req.body;
    try{
        const product=await Product.findById(productId);
        if(!product){
            return res.status(404).json({message:"Product not found"});

        }

        //Determine if the user is guest or logged in user
        let cart=await getCart(userId,guestId);

        //if the cart is already exist update it
        if(cart){
            const productIndex=cart.products.findIndex(
                (p)=>p.productId.toString()===productId&&p.size===size && p.color===color
            );
            if(productIndex>-1){
                //if the product is already exist,update the quantity
                cart.products[productIndex].quantity+=quantity;
            }else{
                //add new product
                cart.products.push({
                    productId,
                    name:product.name,
                    image:product.images[0].url,
                    price:product.price,
                    size,
                    color,
                    quantity,
                });
            }

            //Recalculate thr total price
            cart.totalPrice=cart.products.reduce((acc,item)=>acc+item.price*item.quantity,0);
        await cart.save();
        return res.status(200).json(cart);
        }else{
            //create the new cart for guest

            const newCart=await Cart.create({
                user:userId?userId:undefined,
                guestId:guestId?guestId:"guest_"+new Date().getTime(),
                products:[
                    {
                        productId,
                        name:product.name,
                        image:product.images[0].url,
                        price:product.price,
                        size,
                        color,
                        quantity,

                    }
                ],
                totalPrice:product.price*quantity,
            });
            return res.status(201).json(newCart);
        }   

    }catch(error){
        console.error(error);
        res.status(500).json({message:"Server Error"});
    }
});

//update the quantity

//@route PUT/api/cart
//@desc update quantity for guest or logged user
//@access public

router.put("/",async(req,res)=>{
    const {productId,
        quantity,
        size,
        color,
        guestId,
        userId}=req.body;
    try{
        let cart=await getCart(userId,guestId);
        if(!cart) return res.status(404).json({message:"Cart not found"});

        const productIndex=cart.products.findIndex(
            (p)=>p.productId.toString()===productId&&p.size===size && p.color===color
        );

        if(productIndex>-1){
            if(quantity>0){
                cart.products[productIndex].quantity=quantity;
            }else{
                cart.products.splice(productIndex,1);//remove products if qunatity is 0
            }

             //Recalculate thr total price
             cart.totalPrice=cart.products.reduce((acc,item)=>acc+item.price*item.quantity,0);
             await cart.save();
             return res.status(200).json(cart);
        }else{
            return res.status(404).json({message:"Product not found in cart"});
        }
    }catch(error){
        console.error(error);
        res.status(500).json({message:"Server Error"});
    }
});

//Delete the product
//@route DELETE/api/cart
//@desc remove a product from the cart
//access public
router.delete("/",async(req,res)=>{
    const {productId,
        quantity,
        size,
        color,
        guestId,
        userId}=req.body;
        try{
            let cart=await getCart(userId,guestId);
            if(!cart) return res.status(404).json({message:"Cart not found"});

            const productIndex=cart.products.findIndex(
            (p)=>p.productId.toString()===productId && p.size===size && p.color===color
            );

            if(productIndex>-1){
                cart.products.splice(productIndex,1);
                cart.totalPrice=cart.products.reduce((acc,item)=>acc+item.price*item.quantity,0);
                await cart.save();
                return res.status(200).json(cart);
            }else{
                return res.status(404).json({message:"Product not found in cart"});
            }
        }catch(error){
            console.error(error);
            res.status(500).json({message:"Server Error"});
        }
});

//displaying the cart
//@route GET/api/cart
//@desc get logged user or guest's cart
//access public
router.get("/",async(req,res)=>{
    const{userId,guestId}=req.query;
    try{
        const cart=await getCart(userId,guestId);
        if(cart){
            res.json(cart);
        }else{
            res.status(404).json({message:"cart not found"});
        }
    }catch(error){
        console.error(error);
        res.status(500).json({message:"Server Error"});
    }
});

//merge the route if the user is guest then get him into signup page
//@route POST/api/cart/merge
//@desc Merge guest cart into user cart on login
//access private
router.post("/merge",protect, async(req,res)=>{
    const {guestId}=req.body;

    try{
        const guestCart=await Cart.findOne({guestId});
        const userCart=await Cart.findOne({user:req.user._id});

        if(guestCart){
            if(guestCart.products.length===0){
                return res.status(400).json({message:"guest cart is empty"});
            }
            if(userCart){
                //merge guest cart into user cart
                guestCart.products.forEach((guestItem)=>{
                    const productIndex=userCart.products.findIndex(
                        (item)=>item.productId.toString()===guestItem.productId && 
                        item.size===guestItem.size && item.color===guestItem.color
                        );
                        if(productIndex>-1){
                            userCart.products[productIndex].quantity+=guestItem.quantity;
                        }else{
                            userCart.products.push(guestItem);
                        }
                });
                userCart.totalPrice=userCart.products.reduce((acc,item)=>acc+item.price*item.quantity,0); 
                await userCart.save();
                
                //remove the guest cart after merging
                try{
                    await Cart.findOneAndDelete({guestId});
                }catch(error){
                    console.error("error deleting guest cart: ",error);
                    //res.status(500).json({message:"Server Error"});
                }
                res.status(200).json(userCart);
            }else{
                //if the user has no existing cart,assing the gusrt cart to the user
                guestCart.user=req.user._id;
                guestCart.guestId=undefined;
                await guestCart.save();
                res.status(200).json(guestCart);
            }
        }else{
            if(userCart){
                //if guest cart is alreday emerged
                return res.status(200).json(userCart);
            }
            res.status(404).json({message:"guest cart not found"});
        } 
    }catch(error){
        console.error(error);
        res.status(500).json({message:"Server Error"});
    }
})

module.exports=router;