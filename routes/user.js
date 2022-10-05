const express = require('express');
const {  updatePassword, updateUser } = require('../controllers/user');
const router = express.Router();

router.patch("/user/update", updateUser)
router.patch("/user/change_password",updatePassword)

module.exports = router