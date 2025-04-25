const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");

const userSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true,
        },
        email:{
            type:String,
            required:true,
            unique:true,
            trim:true,
            match:[/.+\@.+\../,"Please enter a valid email addresss"],
        },
        password:{
            type:String,
            required:true,
            minLength:6,
        },
        role:{
            type:String,
            enum:["customer","admin"],
            default:"customer",
        },        
    },

    {timestamps:true},
);

//Password hash middleware
userSchema.pre("save",async function (next) {
    if(!this.isModified("password")) return next();
    const salt =await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
    next();
});

//Match user enterd passsword to HASHED password
userSchema.methods.matchPassword=async function (enetredPassword) {
    return await bcrypt.compare(enetredPassword,this.password);   
};

module.exports=mongoose.model("User",userSchema);