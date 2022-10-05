const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bycript = require("bcryptjs")

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Please provide your firstname"]
    },
    lastName: {
        type: String,
        required: [true, "Please proved your lastname"]
    },
    email: {
        type: String,
        required: [true, "Please proved your email"],
        unique: true
    },
    phone: {
        type: String,
        required: [true, "Please provide your phone number"]
    },
    gender: {
        type: String,
        required: [true, "Please specify your gender"],
        enum: ['male', 'female', 'other']
    },
    password: {
        type: String,
        required: [true, "Please enter password"],
        minlength: 4
    },

    role: {
        type: Number,
        enum: [111, 222, 333],
        default: 333,
    },
    tickets: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Ticket" }
    ]

}, { timestamps: true })

userSchema.pre("save", async function () {
    const salt = await bycript.genSalt(10)
    this.password = await bycript.hash(this.password, salt)
})


userSchema.methods.comparePassword = async function (candidatePwd) {
    const isMatch = await bycript.compare(candidatePwd, this.password)
    return isMatch;
}

userSchema.methods.createJWT = function () {
    const payload = {
        id: this._id,
        email: this.email,
        role: this.role

    }
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME });
    return token;
}
userSchema.statics.findAdmin = function () {
    return mongoose.model("User").find({ role: 0 })
}
userSchema.query.byName = function (name) {
    return this.where({ name })
}


// userSchema.virtual('tickets', {
//     ref: 'Ticket',
//     localField: 'authorId',
//     foreignField: '_id',
//     justOne: true
// })


module.exports = mongoose.model("User", userSchema)