import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

export default mongoose.models.Users || mongoose.model("Users", userSchema);