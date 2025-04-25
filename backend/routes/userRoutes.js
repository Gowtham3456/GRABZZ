const express=require("express");
const User=require("../models/User");
const jwt=require("jsonwebtoken");
const {protect}=require("../middleware/authMiddleware");
const router=express.Router();
//Register request
//@route POST/api/users/register
//@desc Register a new user
//@access Public

router.post("/register",async (req,res)=>{
    const {name,email,password}=req.body;

    try{
        //Registration logic
       // res.send({name,email,password});
       let user =await User.findOne({email});
        //if useremail is alreday there
       if(user) return res.status(400).json({message:"User already exist"});
        //if new user then allow to registerr and store data to database
       user =new User({name,email,password});
       await user.save();

       //create jwt payload
       const payload={user:{id:user._id,role:user.role}};

       //Sign and return the token along with data
       jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"40h"},(err,token)=>{
        if(err) throw err;
        //send the user and token in response
        res.status(201).json({
        user:{
            _id:user._id,
            name:user.name,
            email:user.email,
            role:user.role
        },
        token,
       });
       });

            //    res.status(201).json({
            //     user:{
            //         _id:user._id,
            //         name:user.name,
            //         email:user.email,
            //         role:user.role
            //     }
            //    });

    }catch(error){
        console.log(error);
        res.status(500).send("Server Error");

    }
    
});

//Login request

//@route POST/api/users/login
//@desc Authedicate user
//@access Public
router.post("/login",async (req,res)=>{
    const {email,password}=req.body;

    try{
        //find the user by email
        let user=await User.findOne({email});

        if(!user) return res.status(400).json({message:"Invalid Credentials"});
        //password matching checking
        const isMatch=await user.matchPassword(password);

        if(!isMatch)
            return res.status(400).json({message:"Invalid Credentials"});

        //create jwt payload
        const payload={user:{id:user._id,role:user.role}};

       //Sign and return the token along with data
        jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"40h"},(err,token)=>{
        if(err) throw err;
        //send the user and token in response
        res.json({
        user:{
            _id:user._id,
            name:user.name,
            email:user.email,
            role:user.role
        },
        token,
       });
     }
     );
    }catch(error){
        console.log(error);
        res.status(500).send("server error");
    }
});

//User Profile route

//@route GET/api/users/profile
//@desc get the logged in users profile{protected rotue}
//@access private

router.get("/profile",protect,async(req,res)=>{
    res.json(req.user);
})

module.exports=router;
