const express = require('express');
const { register,login,getAuthUser, logout } = require('../controllers/auth');
const { authVerification } = require('../middlewares');
const router = express.Router();

router.post('/user/register',register)
router.post('/user/login',login)
router.get('/getAuthUser',authVerification,getAuthUser)
router.get('/logout',authVerification,logout)

module.exports = router