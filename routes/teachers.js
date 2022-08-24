const express = require('express');
const { roles: { admin, hod, teacher } } = require("../config")
const { authVerification, rolesCheck } = require('../middlewares');
const router = express.Router();

router.get('/students',authVerification,rolesCheck(admin,hod,teacher), (req, res) => {
    res.status(200).json({ message: "students list" })
})

module.exports = router