import connectDb from "../../utils/connectDb";
import Product from "../../models/Product";
import verifyToken from "./middleware/verifyToken";

connectDb();

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await verifyToken(req, res);
      const products = await Product.find();
      if (products.length > 0) res.status(200).json(products);
      else res.status(404).json({ result: "No Products Found" });
    } catch (error) {
      console.error("Error in /products:", error);
      res.status(500).send("Server Error");
    }
  } else {
    res.status(405).send("Method Not Allowed");
  }
}
