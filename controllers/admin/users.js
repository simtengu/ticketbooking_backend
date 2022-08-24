const { roles: { admin } } = require("../../config");
const user = require("../../models/user");

const fetchUsers =  async (req, res) => {
    const users = await user.find({ role: { $ne: admin } }).sort({createdAt:"desc"});
    res.status(200).json({ users })
}

const searchUser = async (req, res) => {
    const {key:searchTerm} = req.query
    let users;
  if(searchTerm){
      //search user basing on search term
       users = await user.find({ role: { $ne: admin }, $or: [{ firstName: { $regex: '.*' + searchTerm + '.*', $options: 'i' } }, { lastName: { $regex: '.*' + searchTerm + '.*', $options: 'i' } }] }).sort({ createdAt: "desc" });
}else{
    //fetch all users(search term not defined)
       users = await user.find({ role: { $ne: admin }}).sort({createdAt:"desc"})

  }
    res.status(200).json({ users })
}

module.exports = {fetchUsers,searchUser}