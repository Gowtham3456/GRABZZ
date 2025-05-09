const express=require("express");
const Checkout=require("../models/Checkout");
const Cart=require("../models/Cart");
const Product=require("../models/Product");
const Order=require("../models/Order");
const {protect}=require("../middleware/authMiddleware");

const router=express.Router();

//crete a checkout session
//@route POST/api/checkout
//@decs crete a checkout session
//@access private

router.post("/",protect,async(req,res)=>{
    const {
        checkoutItems,
        shippingAddress,
        paymentMethod,
        totalPrice
    }=req.body;

    if(!checkoutItems||checkoutItems.length===0){
        return res.status(400).json({messege:"No items in checkout"});
    }
    try{

        //create a new checkout session
        const newCheckout=await Checkout.create({
            user:req.user._id,
            checkoutItems:checkoutItems,
            shippingAddress,
            paymentMethod,
            totalPrice,
            paymentStatus:"pending",
            isPaid:false,
        });
        console.log(`checkout created for user:${req.user._id}`);
        res.status(201).json(newCheckout);
    }catch(error){
        console.error("error creting checkout session",error);
        res.status(500).send("Server error");
    }
});

//upadte checkout after the payment
//@route PUT/api/checkout/:id/pay
//@desc update checkout to mark as paid after successful  payment
//acess private

router.put("/:id/pay",protect,async(req,res)=>{
    const{paymentStatus,paymentDetails}=req.body;
    try{
        const checkout=await Checkout.findById(req.params.id);
        if(!checkout){
            return res.status(404).json({messege:"Checkout not found"});
        }
        if(paymentStatus==="paid"){
            checkout.isPaid=true;
            checkout.paymentStatus=paymentStatus;
            checkout.paymentDetails=paymentDetails;
            checkout.paidAt=Date.now();
            await checkout.save();

            res.status(200).json(checkout);
        }else{
            res.status(400).json({message:"invalid payment status"});
        }
    }catch(error){
        console.error(error);
        res.status(500).json({message:"server error"});
    };
});

//finalize the payment confirmation
//@route POST/api/checkout/:id/finalize
//@desc finalize to checkout and confirm as order after payment confirmation
//access private

router.post("/:id/finalize",protect,async(req,res)=>{
    try{
        const checkout=await Checkout.findById(req.params.id);
        if(!checkout){
            return res.status(404).json({messege:"Checkout not found"});
        }
        if(checkout.isPaid && !checkout.isFinalized){
            const finalOrder=await Order.create({
            user:checkout.user,
            orderItems:checkout.checkoutItems,
            shippingAddress:checkout.shippingAddress,
            paymentMethod:checkout.paymentMethod,
            totalPrice:checkout.totalPrice,
            isPaid:true,
            paidAt:checkout.paidAt,
            isDeliverd:false,
            paymentStatus:"paid",
            paymentDetails:checkout.paymentDetails
            });

            //mark the checkout is finalized

            checkout.isFinalized=true;
            checkout.finalizedAt=Date.now();
            await checkout.save();

            //delete the cart assocuated to the user after the order is confirmed
            await Cart.findOneAndDelete({user:checkout.user});
            res.status(201).json(finalOrder);
        }else if(checkout.isFinalized){
            res.status(400).json({message:"checkout is already finalized"});
        }else{
            res.status(400).json({message:"checkout is not paid"});
        }
    }catch(error){
        console.error(error);
        res.status(500).json({message:"server error"});
    }
});

module.exports=router;