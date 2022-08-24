const CustomApiError = require("./customError");

class ForbiddenRequestError extends CustomApiError {
    constructor(message) {
        super(message)
        this.statusCode = 403
    }
}

module.exports = ForbiddenRequestError