require('dotenv').config()
const jwt = require('jsonwebtoken');

/*Middleware for verifying the JWT Token. */
const verifyjwt = async function (req, res, next) {
    try {
        let tokenHeader = req.headers['authorization']
        if (tokenHeader) {
            let token = await tokenHeader.split(" ");
            let index = blackListTokens.indexOf(token[1]);
            if (index == -1) {
                let decoded = await jwt.verify(token[1], process.env.JWT_SECRET);
                if (decoded) {
                    req.role = decoded.role;
                    req.loggedInUserId = decoded._id
                    return next()
                } else {
                    return res.status(401).json({ success: false, error: 'JWT Token is  expired.' })
                }
            } else {
                return res.status(401).json({ success: false, error: 'This JWT Token is already expired.' })
            }
        } else {
            return res.status(401).json({ success: false, error: 'JWT Token Required' })
        }
    } catch (error) {
        return res.json(error)
    }
}

module.exports = verifyjwt;