const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
    name:String,
    
    email : String,
    password: String,
    confirmpassword : String,
    mobile : String,
    address : String
})

module.exports = mongoose.model("users", UserSchema)