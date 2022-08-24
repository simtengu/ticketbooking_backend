const CustomApiError = require("./customError");
class UnAuthrizedError extends CustomApiError {
    constructor(message) {
        super(message)
        this.statusCode = 401
    }
}

module.exports = UnAuthrizedError