const express = require("express")
const app = express();
const cors = require('cors')
const cookieParser = require("cookie-parser")
require('dotenv').config();
require('express-async-errors');

const User = require("./models/user")

//middlewares.................................................. 
const { errorHandler, notFoundHandler } = require("./middlewares")
const { authVerification, rolesCheck, credentials } = require('./middlewares');
//configs
const { roles: { admin, customer }, corsOptions } = require("./config")
const { authRouter, adminRouter, teachersRouter, customersRouter } = require("./routes");

const connectDb = require("./db");
//use middlewares.... 

//allowed origins/cookies .......... ....
app.use(credentials)
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())
//routes.............. .... 
app.get("/", async function (req, res) {
    console.log("cookies ", req.cookies)
    let { authUser } = req.cookies()
    const user = await User.findOne({ name: authUser })
    res.json({ user })
})
//auth..
app.use('/api', authRouter)
//students..
app.use('/api', customersRouter)
//teachers..
app.use('/api', teachersRouter)
//admin..
app.use('/api/admin', authVerification, rolesCheck(admin, customer), adminRouter)
//error handler............. 
app.use(errorHandler)
app.use(notFoundHandler)

const port = process.env.PORT || 5000;

const start = async () => {
    try {
        await connectDb(process.env.MONGO_URI);
        // console.log('connected to mongo db');
        app.listen(port, () => {
            console.log(`app is listening on port ${port}`);
        })

    } catch (error) {
        console.log('Server cannot start.....something went wrong ');
    }

}

start();

