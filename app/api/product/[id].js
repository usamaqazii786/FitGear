import connectDb from "../../../utils/connectDb";
import Product from "../../../models/Product";
import verifyToken from "../middleware/verifyToken";

connectDb();

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      await verifyToken(req, res);
      const product = await Product.findById(id);
      if (product) res.status(200).json(product);
      else res.status(404).json({ result: "No Product Found" });
    } catch (error) {
      console.error("Error in GET /product/[id]:", error);
      res.status(500).send("Server Error");
    }
  } else if (req.method === "DELETE") {
    try {
      await verifyToken(req, res);
      const result = await Product.findByIdAndDelete(id);
      res.status(200).json(result);
    } catch (error) {
      console.error("Error in DELETE /product/[id]:", error);
      res.status(500).send("Server Error");
    }
  } else {
    res.status(405).send("Method Not Allowed");
  }
}
