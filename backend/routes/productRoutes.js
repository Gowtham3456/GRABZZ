const express=require("express");
const Product=require("../models/Product");
const {protect,admin}=require("../middleware/authMiddleware");

const router=express.Router();

//@route Post/api/products
//@desc Craete a new product
//@access private/admin

router.post("/",protect,admin, async(req,res)=>{
    try{
        if(!req.body){
            return res.status(400).json({message:"request body is missing"});
        }
        const {
            name,
            description,
            price,
            discountPrice,
            countInStock,
            category,
            brand,
            sizes,
            colors,
            collections,
            material,
            gender,
            images,
            isFeatured,
            isPublished,
            tags,
            dimensions,
            weight,
            sku,
        }=req.body;

        const product=new Product({
            name,
            description,
            price,
            discountPrice,
            countInStock,
            category,
            brand,
            sizes,
            colors,
            collections,
            material,
            gender,
            images,
            isFeatured,
            isPublished,
            tags,
            dimensions,
            weight,
            sku,
            user:req.user._id,//Reference to the admin user who created it
        });

        const createdProduct=await product.save();
        res.status(201).json(createdProduct);
    }catch(error){
        console.error(error);
        res.status(500).send("Server Error");
    }
});

//update the product
//@route PUT/api/products/:_id
//desc update the existing product by its id
//@ acces private admin
router.put("/:id",protect,admin, async(req,res)=>{
    try{
        if(!req.body){
            return res.status(400).json({message:"request body is missing"});
        }
        const {
            name,
            description,
            price,
            discountPrice,
            countInStock,
            category,
            brand,
            sizes,
            colors,
            collections,
            material,
            gender,
            images,
            isFeatured,
            isPublished,
            tags,
            dimensions,
            weight,
            sku,
        }=req.body;
        //find the product by ID
        const product=await Product.findById(req.params.id);

        if(product){
            //update the product if id is available
            product.name=name||product.name;
            product.description=description||product.description;
            product.price=price||product.price;
            product.discountPrice=discountPrice||product.discountPrice;
            product.countInStock=countInStock||product.countInStock;
            product.category=category||product.category;
            product.brand= brand||product.brand;
            product.sizes=sizes||product.sizes;
            product.colors=colors||product.colors;
            product.collections=collections||product.collections;
            product.material=material||product.material;
            product.gender= gender||product.gender;
            product.images=images||product.images;
            product.isFeatured=isFeatured!==undefined?isFeatured:product.isFeatured;
            product.isPublished=isPublished!==undefined?isPublished:product.isPublished;
            product.tags=tags||product.tags;
            product.dimensions=dimensions||product.dimensions;
            product.weight=weight||product.weight;
            product.sku=sku||product.sku;


            //Save the upadted product to the databse
            const updatedProduct=await product.save();
            res.json(updatedProduct)
        }else{
            res.status(404).json({message:"Prodct not found"});
        }

    }catch(error){
        console.log(error);
        res.status(500).send("Server error");
    }
});
//Delete the product
//@route DELETE/api/products
//@des delete the products by ID
//@access private/admin
router.delete("/:id",protect,admin,async (req,res)=>{
    try{
        const product=await Product.findById(req.params.id);
        if(product){
            await product.deleteOne();
            res.json({message:"Product removed"})
        }else{
            //if product doesn't exist show error
            res.status(404).json({message:"Product not found"});
        }

    }catch(error){
        console.error(error);
        res.status(500).send("Server error");
    }
});

//@route GET/api/products
//@desc Get all the products with optional query filters
//@access public

router.get("/",async(req,res)=>{
    try{
    const {collection,
        size,
        color,
        gender,
        minPrice,
        maxPrice,
        sortBy,
        search,
        category,
        material,
        brand,
        limit}=req.query;
        //initialize the query object
        let query={};

        //filter logic
        if(collection && collection.toLocaleLowerCase()!=="all"){
            query.collections=collection;
        }

        if(category && category.toLocaleLowerCase()!=="all"){
            query.category=category;
        }

        if(material){
            query.material={$in: material.split(",")};
        }

        if(brand){
            query.brand={$in: brand.split(",")};
        }

        if(size){
            query.sizes={$in: size.split(",")};
        }
        if(color){
            query.colors={$in: [color]};
        }

        if(gender){
            query.gender=gender;
        }

        if(minPrice||maxPrice){
            query.price={};
            if(minPrice) query.price.$gte=Number(minPrice);
            if(maxPrice) query.price.$lte=Number(maxPrice);
        }

        if(search){
            query.$or=[
                {name:{$regex:search,$options:"i"}},
                {description:{$regex:search,$options:"i"}},
            ];
        }

        //sort logic
        let sort={};
        if(sortBy){
            switch(sortBy){
                case "priceAsc":
                    sort={price:1};
                    break;
                case "priceDesc":
                    sort={price:-1};
                    break;
                case "popularity":
                    sort={rating:-1};
                    break;
                default:
                    break;
            }
        }

        //fetch the product from the database
        let products=await Product.find(query).sort(sort).limit(Number(limit)||0);

        res.json(products);

    }catch(error){
        console.log(error);
        res.status(500).json({message:"Server error"});
    }
});

//best seller route

//@route  GET/api/products/best-seller
//@desc Retrive the products with highest rating
//@acces public

router.get("/best-seller",async(req,res)=>{
    try{
        const bestSeller=await Product.findOne().sort({rating:-1});
        if(bestSeller){
            res.json(bestSeller);
        }else{
            res.status(404).json({message:"No best seller found"});
        }
    }catch(error){
        console.log(error);
        res.status(500).send("Server error");
    }
});

//      NEW ARRIVALS
//@route GET/api/product/new-arrivals
//@desc Retrive the product based on created date
//@access public
router.get("/new-arrivals",async(req,res)=>{
    try{
        const newArrivals=await Product.find().sort({createdAt:-1}).limit(8);
        res.json(newArrivals);
    }catch(error){
        console.log(error);
        res.status(500).send("Server error");
    }
})


//retrive a single product by its id
//@route GET/api/product/:id
//@desc Get asingle product by its id
//@access public
router.get("/:id",async(req,res)=>{
    try{
        const product=await Product.findById(req.params.id);
        if(product){
            res.json(product);
        }else{
            res.status(404).json({message:"Product not found"});
        }
    }catch(error){
        console.error(error);
        res.status(500).send("Server error");
    }
})

//display the similiar product based on the current product
//@route GET/api/product/similar/:id
//@desc retrive the products basedd on the current products geneder or category
//@access public
router.get("/similar/:id",async(req,res)=>{
    const {id}=req.params;
    //console.log(id);
    try{
        const product=await Product.findById(id);
        if(!product){
            return res.status(404).json({message:"Product not found"});
        }

        //logic to find similiar product

        const similarProducts=await Product.find({
            _id:{$ne:id},//exclude the current product
            gender:product.gender,
            category:product.category,
        }).limit(4);

        res.json(similarProducts);
    }catch(error){
        console.log(error);
        res.status(500).send("Server error");
    }
});



module.exports=router;