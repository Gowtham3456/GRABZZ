const express=require("express");
const cors=require("cors");
const dotenv=require("dotenv");
const connectDB=require("./config/db");
const userRoutes=require("./routes/userRoutes");

const app=express();
app.use(express.json());
app.use(cors());
dotenv.config();

//console.log(process.env.PORT);

const PORT=process.env.PORT ||3000;

//connect to mongodb database
connectDB();

app.get("/",(req,res)=>{
    res.send("WELCOME TO GRABZZ API")
});

//API routes
app.use("/api/users",userRoutes);

app.listen(PORT,()=>{
    console.log(`server is ruuning on http://localhost:${PORT}`);
})