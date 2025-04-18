import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
    name:String,
    email:{
        type: String,
        unique:true
    },
    password:String,
});

export default mongoose.models.Users || mongoose.model("Users", UsersSchema);
// module.exports = mongoose.model("users", UsersSchema);
