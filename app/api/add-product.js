import connectDb from "../../utils/connectDb";
import Product from "../../models/Product";
import verifyToken from "./middleware/verifyToken";

connectDb();

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await verifyToken(req, res);
      const product = new Product(req.body);
      const result = await product.save();
      res.status(201).json({ success: true, product: result });
    } catch (error) {
      console.error("Error in /add-product:", error);
      res.status(500).json({ error: "Error saving product" });
    }
  } else {
    res.status(405).send("Method Not Allowed");
  }
}
