const mongoose = require("mongoose")
const busSchema = new mongoose.Schema({
    busNumber: String,
    numberOfSeats: String,
    busRoute: String,
    busPicture: String,

}, { timestamps: true })

module.exports = mongoose.model("Bus", busSchema)

