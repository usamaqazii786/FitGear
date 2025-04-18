import express from "express";
import cors from "cors";
import JWT from "jsonwebtoken";
import dotenv from "dotenv";
import Users from "./db/Users";
import Product from "./db/Product";
// import JwtKey from 'e-comm';
dotenv.config();

const JwtKey = process.env.JWT_SECRET || 'e-comm';
// https://www.youtube.com/watch?v=zrBVFGlnyA8&list=PLA9oyBlTfuCi76n9Bz0cJkbgg1WU09xg0

const googleApp = express();


googleApp.use(express.json());
googleApp.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
}));


const port = process.env.PORT || 5000;
googleApp.get("/", (req, resp) => {
    resp.send("app is working");
});
googleApp.listen(port);

googleApp.all('*', (req, res) => {
    return handle(req, res);
});


// register api 
googleApp.post("/register", async (req, resp) => {
    try {
        const user = new Users(req.body);
        let result = await user.save();
        result = result.toObject();
        delete result.password;
        if (user) {
            JWT.sign({ result }, JwtKey, { expiresIn: "2d" }, (err, token) => {
                if (err) {
                    return resp.status(500).send({ result: "something went wrong, please try after sometime" });
                }
                resp.send({ result, auth: token });
            });
        }
    } catch (error) {
        resp.status(500).send("An error occurred");
        console.error("Error in /register:", error);
    }
});

googleApp.post('/login', async (req, resp) => {
    try {
        if (req.body.password && req.body.email) {
            const user = await Users.findOne(req.body).select("-password");
            console.log(user,'req.body')
            if (user) {
                JWT.sign({ user }, JwtKey, (err, token) => {
                    if (err) {
                        return resp.status(500).send({ result: "something went wrong, please try after sometime" });
                    }
                    resp.send({ user, auth: token });
                });
            } else {
                resp.status(400).send({ result: "No User Found" });
            }
        } else {
            resp.status(400).send({ result: "Invalid credentials" });
        }
    } catch (error) {
        resp.status(500).send({ result: "Server Error", error });
        console.error("Error in /login:", error);
    }
});


// Repeat for other routes...

googleApp.post('/add-product', verifyToken, async (req, resp) => {
    try {
        const product = new Product(req.body);
        const result = await product.save();
        console.log("Saved Product:", result); // Log the saved product for debugging
         console.log("Request received:", req.body); // Log incoming request data
    const { name, price, category, company, userId } = req.body;

    // Simulate adding product (replace with actual logic)
    const newProduct = { name, price, category, company, userId };

    resp.status(200).json({ success: true, product: newProduct });  // Send the saved product as response
    } catch (error) {
        console.error("Error in /add-product:", error);
        resp.status(500).send({ error: "Error saving product" });
    }
});

// googleApp.post('/add-product', verifyToken, async (req, resp) => {
//     const { name, price, category, company, userId } = req.body;
//     if (!name || !price || !category || !company || !userId) {
//         return resp.status(400).send({ error: 'Missing required fields' });
//     }

//     try {
//         const product = new Product({ name, price, category, company, userId });
//         const result = await product.save();
//         resp.status(201).send({ success: true, product: result });
//     } catch (error) {
//         resp.status(500).send({ error: 'Error saving product', details: error.message });
//     }
// });

googleApp.get("/products", verifyToken, async (req, resp) => {
    let products = await Product.find();
    if (products.length > 0) {
        resp.send(products);
    } else {
        resp.send({ result: "No Products Found" });
    }
});

googleApp.delete("/product/:id", verifyToken, async (req, resp) => {
    const result = await Product.deleteOne({ _id: req.params.id });
    resp.send(result);
});

googleApp.get("/product/:id", verifyToken, async (req, resp) => {
    const result = await Product.findOne({ _id: req.params.id });
    if (result) {
        resp.send(result);
    } else {
        resp.send({ result: "No Record Found" });
    }
});

googleApp.put("/product/:id", verifyToken, async (req, resp) => {
    let result = await Product.updateOne(
        { _id: req.params.id },
        { $set: req.body }
    );
    resp.send(result);
});

googleApp.get("/search/:key", verifyToken, async (req, resp) => {
    try {
        let result = await Product.find(
            {
                "$or": [
                    { name: { $regex: req.params.key } },
                    { company: { $regex: req.params.key } },
                    { category: { $regex: req.params.key } }
                ]
            }
        );
        resp.status(200).send(result);
    } catch (error) {
        resp.status(500).send({ error, result: "No Record Found" });
    }

});

function verifyToken(req, resp, next) {
    let token = req.headers['authorization'];
    if (token) {
        token = token.split(' ')[1];
        console.warn("meddleware", token);
        JWT.verify(token, JwtKey, (err, valid) => {
            if (err) {
                resp.status(401).send({ result: "please provide valid token" });
            } else {
                next();
            }
        })
    } else {
        resp.status(403).send({ result: "please add token with header" });
    }
}

// const upload = multer(
//     {
//         storage:multer.diskStorage({
//             destination:function (req,file,cb) {
//                 cb(null,"upload")
//             },
//             filename:function (req,file,cb) {
//                 cb(null,file.fieldname+"-"+Date.now()+".jpg")
//             }
//         })
//     }
// ).single("user_file");

// app.post("/upload", upload, async (req,resp)=>{
//     resp.send(req.body);
// })

// app.get("/upload-get", upload, (req,resp)=>{
//     resp.send(req?.body);
// })


// const connectDb = async () => {
//     try {
//         // Remove deprecated options
//         await mongoose.connect("mongodb://127.0.0.1:27017/e-comm");
//         console.log("Connected to MongoDB");

//         const ProductSchema = new mongoose.Schema({});
//         const Product = mongoose.model("products", ProductSchema);
//         const data = await Product.find();
//         console.warn(data);
//     } catch (error) {
//         console.error("Error connecting to MongoDB:", error);
//     }
// };

// connectDb();



googleApp.get("/", (req, resp) => {
    resp.send("app is working");
});

// app.listen(5000);