const express=require("express");
const Order=require("../models/Order");
const { protect }=require("../middleware/authMiddleware");

const router=express.Router();

//get all the orders
//@route GET/api/orders/my-orders
//@decs get all the orders
//@access private

router.get("/my-orders",protect,async(req,res)=>{
    try{
        //find orders for authendicated user
        const orders=await Order.find({user:req.user._id}).sort({craetedAt:-1});
        res.json(orders);
    }catch(error){
        console.error(error);
        res.status(500).json({message:"Server error"});
    }
});

//get full orders
//@route GET/api/orders/:id
//@decs get all order details by id
//@access private

router.get("/:id",protect,async(req,res)=>{
    try{
        const order=await Order.findById(req.params.id).populate(
            "user",
            "name email"
        );
        if(!order){
            return res.status(400).json({messege:"order not found"});
        }

        //return full order details if successfully found
        res.json(order);

    }catch(error){
        console.error(error);
        res.status(500).json({message:"Server error"});
    }
});

module.exports=router;