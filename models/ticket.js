const mongoose = require("mongoose")
const ticketSchema = new mongoose.Schema({
    owner: { type: Object, required: [true, "Please provide owner details"] },
    from: { type: String, required: [true, "Please  fill the from field"] },
    to: { type: String, required: [true, "Please  fill the to field"] },
    price: { type: Number, required: [true, "Please  fill the price field"] },
    busType: String,
    round: String,
    ticketNumber: String,
    departingDate: {type:Date,required:[true,"please provide daparting date"]},

}, { timestamps: true })

module.exports = mongoose.model("Ticket", ticketSchema)
// 991384091730
