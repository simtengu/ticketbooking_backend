const UnAuthorizedError = require("./unAuthorizedError")
const  ForbiddenRequestError = require("./forbbiden")
const BadRequestError = require("./badRequest")
const NotFoundError = require("./notFound")
const CustomApiError = require("./customError")

module.exports = {
    UnAuthorizedError,
    ForbiddenRequestError,
    BadRequestError,
    CustomApiError,
    NotFoundError
}