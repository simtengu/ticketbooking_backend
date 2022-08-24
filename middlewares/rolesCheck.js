const {ForbiddenRequestError} = require("../errors")
const rolesCheck = (...roles) => {

    return async (req,res,next)=>{
        const user_role = req.user.role;
        const allowed_roles = [...roles];

        if(!allowed_roles.includes(user_role)) throw new ForbiddenRequestError("You don't have access for this resource")

        next()
    }
}

module.exports = rolesCheck