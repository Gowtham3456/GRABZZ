const express=require("express");
const router=express.Router();
const Subscriber=require("../models/Subscriber");


//route for subscriber
//@route POST/api/subscriber
//@desc hanldle newsletter sbscription
//@ acces public
router.post("/subscribe",async(req,res)=>{
    const {email}=req.body;
    if(!email){
        return res.status(400).json({message:"Email is required"});
    }
    try{
        //check if email is already subscribed
        let subscriber=await Subscriber.findOne({email});

        if(subscriber){
            return res.status(400).json({message:"Email is already subscribed"});
        }

        //create a new subscriber
        subscriber=new Subscriber({email});
        await subscriber.save();

        res.status(201).json({messaege:"succesfuylly subscribed to newsletter"})
    }catch(error){
        console.error(error);
        res.status(500).json({message:"Server error"});
    }
});

module.exports=router;