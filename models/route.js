const mongoose = require("mongoose")

const routeSchema = new mongoose.Schema({
    from: {
        type: String,
        required: [true, "you did'nt fill the from field"]
    },
    to: {
        type: String,
        required: [true, "provide the destination of the route(To field)"]
    },
    routeMap: String,
    distance: String,
    price: {
        type: Number,
        required: [true, "provide price of a ticket for this route"]
    },
    perDayRounds: {
        type: [Object]
    }
}, { timestamps: true })

module.exports = mongoose.model("Route", routeSchema)