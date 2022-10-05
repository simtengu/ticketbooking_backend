const { roles: { admin } } = require("../../config");
const Message = require("../../models/message");
const Ticket = require("../../models/ticket");
const user = require("../../models/user");
const { BadRequestError, NotFoundError, ForbiddenRequestError } = require("../../errors")

const fetchUsers = async (req, res) => {
    // const users = await user.find({ role: { $ne: admin } }).sort({createdAt:"desc"});
    const users = await user.find({}).populate("tickets").sort({ createdAt: "desc" });
    res.status(200).json({ users })
}

const searchUser = async (req, res) => {
    const { key: searchTerm } = req.query
    let users;
    if (searchTerm) {
        //search user basing on search term
        users = await user.find({ role: { $ne: admin }, $or: [{ firstName: { $regex: '.*' + searchTerm + '.*', $options: 'i' } }, { lastName: { $regex: '.*' + searchTerm + '.*', $options: 'i' } }] }).sort({ createdAt: "desc" });
    } else {
        //fetch all users(search term not defined)
        users = await user.find({ role: { $ne: admin } }).sort({ createdAt: "desc" })

    }
    res.status(200).json({ users })
}

const deleteUser = async (req, res) => {
    const { userId } = req.params
    if (!userId) throw new BadRequestError("No user id provided...")
    const found_user = await user.findById(userId)
    if (!found_user) throw new NotFoundError("user with specified id wasn't found")
    if (found_user.role === admin) throw new ForbiddenRequestError("The user you are trying to delete is an admin..Only super admin can perform that action")

    await Ticket.deleteMany({ _id: { $in: found_user.tickets } })
    await user.findByIdAndDelete(userId)

    res.sendStatus(200)

}

const fetchMessages = async (req, res) => {
    const messages = await Message.find({}).sort("-createdAt")
    res.status(200).json(messages)
}

module.exports = { fetchUsers, searchUser, fetchMessages, deleteUser }