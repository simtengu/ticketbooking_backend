const jwt = require('jsonwebtoken')
const { UnAuthorizedError } = require("../errors")
const verifyAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const cookieToken = req.cookies.jwt;
    if (!cookieToken && (!authHeader || !authHeader.startsWith("Bearer "))) {
        throw new UnAuthorizedError("your are not authorized..")
    }
    const token = cookieToken || authHeader.split(" ")[1]
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) throw new UnAuthorizedError("Your session has expired..login again")
        req.user = decoded;
        next()
    })


}

module.exports = verifyAuth