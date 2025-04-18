import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:String,
    price:String,
    category:String,
    userId:String,
    company:String,
});
export default mongoose.models.Product || mongoose.model("Product", productSchema);
// module.exports = mongoose.model("products", productSchema);