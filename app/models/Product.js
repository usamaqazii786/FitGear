import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  company: String,
  userId: String,
});

export default mongoose.models.Product || mongoose.model("Product", productSchema);
