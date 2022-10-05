const mongoose = require("mongoose")
const messageSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    message: String

}, { timestamps: true })

module.exports = mongoose.model("Message", messageSchema)
// 991384091730
