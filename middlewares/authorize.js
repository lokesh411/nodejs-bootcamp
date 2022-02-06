/**
 * 
 * @param {*} ROLES ["SUPPORT_USER", "ADMIN_USER"]
 */
const authorizeUser = (ROLE) => {
    return function (req, res, next) {
        if (req.user) {
            if(req.user.ROLES && req.user.ROLES.includes(ROLE)) {
                next()
            } else {
                return res.status(403).json({ success: false, message: "You are not authorized to perform this operation" })
            }
        } else {
            return res.status(401).json({ success: false, message: "Un authenticated user" })
        }
    }
}

module.exports = {
    authorizeUser
}