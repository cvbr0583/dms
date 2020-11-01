import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
require('dotenv').config()
import User from '../models/user.model';

/* Login Authentication.Checking the user details and return user object and JWT Token */
async function login(req, res) {
    try {
        const { email, password } = req.body
        let user = await User.findOne({ email: email })
        if (user) {
            let passwordMatch = await bcrypt.compare(password, user.hashedPassword)
            if (passwordMatch == true) {
                user = user.toObject()
                delete user.hashedPassword
                let token = await generateToken(user);
                return res.json({ success: true, user, token })
            }
            else {
                return res.json({ success: false, message: 'Invalid Password' })
            }
        }
        else {
            return res.json({ success: false, message: 'No user with this email' })
        }
    } catch (error) {
        return res.json(error)
    }
}

/* Logout Action and make the token into black list tokens */
async function logout(req, res) {
    try {
        let token = req.headers['authorization']
        if (token) {
            token = await token.split(" ");
            await blackListTokens.push(token[1])
            return res.json({ success: true, message: "User successfully logged-out." })
        } else {
            return res.status(401).json({ success: false, message: "Token required to logged-out this user" })
        }
    } catch (error) {
        return res.json(error)
    }
}

/* Generating JWT Token with user object, JWT-Secret, Expires Time */
function generateToken(user) {
    return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
}

module.exports = { generateToken, login, logout }