const mongoose=require("mongoose");
const dotenv=require("dotenv");
const Product=require("./models/Product");
const User=require("./models/User");
const products=require("./data/products");

dotenv.config();
//connect to mongodb
mongoose.connect(process.env.MONGO_URI);

//function to seed the data

const seedData=async()=>{
    try{
        await Product.deleteMany();
        await User.deleteMany();

        //create a default admin
        const createdUser=await User.create({
            name:"Admin User",
            email:"admin@example.com",
            password:"123456",
            role:"admin",

        });

        //Assing the default user id ru each product
        const userID=createdUser._id;
        
        const sampleProducts=products.map((product)=>{
            return{...product,user:userID};  
        });
        
            //insert the product into the database
            await Product.insertMany(sampleProducts);

            console.log("Product data seeded successfully!");
            process.exit();
    }catch(error){
        console.error("Error seeding the data: ",error);
        process.exit(1);
    }
};
seedData();