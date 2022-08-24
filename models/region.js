const mongoose = require("mongoose")

const regionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "you need to proved the name of the region"]
    }
}, { timestamps: true })

module.exports = mongoose.model("Region", regionSchema)