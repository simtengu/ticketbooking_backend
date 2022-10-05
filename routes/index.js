const authRouter = require('./auth')
const adminRouter = require('./admin')
const customersRouter = require('./customers')
const userRouter = require('./user')

module.exports = {
    authRouter,
    adminRouter,
    customersRouter,
    userRouter
}