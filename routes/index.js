const authRouter = require('./auth')
const adminRouter = require('./admin')
const teachersRouter = require('./teachers')
const customersRouter = require('./customers')

module.exports = {
    authRouter,
    adminRouter,
    teachersRouter,
    customersRouter
}