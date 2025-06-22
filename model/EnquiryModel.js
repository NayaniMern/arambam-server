const mongoose = require("mongoose");
const EnquirySchema = mongoose.Schema({
    name:String,
    mobile: String,
    email : String,
    message : String
})

module.exports = mongoose.model("enquiries", EnquirySchema)