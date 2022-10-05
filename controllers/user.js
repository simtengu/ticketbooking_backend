const bycript = require('bcryptjs')
const { NotFoundError } = require("../errors");
const User = require("../models/user");

const updateUser = async (req, res) => {
    
    const user = await User.findByIdAndUpdate(req.user.id, req.body, { new: true })
    if (!user) throw new NotFoundError("user wasn't found")
    res.status(200).json({ user })
}

const updatePassword = async (req, res) => {

    const { password } = req.body
    const user = await User.findById(req.user.id)
    if (!User) throw new NotFoundError("user wasn't found")
    const salt = await bycript.genSalt(10)
    let hashed_password = await bycript.hash(password, salt)
    //update password in db
    await User.findByIdAndUpdate(req.user.id, { password: hashed_password })
    res.sendStatus(200)
}


module.exports = { updateUser, updatePassword }