/*Middleware for verifying the role  */
const adminMiddleware = async function (req, res, next) {
    try {
        if (req.role === 'admin') {
            return next();
        } else {
            return res.status(401).json({ success: false, error: 'Not Authorized for this API call.' })
        }
    } catch (error) {
        return res.json(error)
    }
}

module.exports = adminMiddleware;