const express = require('express')
const jwt = require('jsonwebtoken')
const authController = require('../controller/auth')

const router = express.Router()
const JWT_SIGNING_KEY = process.env.JWT_SIGNING_KEY
console.log('jwt key :: ', JWT_SIGNING_KEY)
/**
 * steps for writing an API:
 * 1. input validation -> checking for special charecters abc <script>alert("Hello")</script>
 * 2. write a handler function for same
 * 3. enclose the handler function with try catch to catch the errors better
 */
router.post('/signup', async (req, res) => {
    const { username, password, email } = req.body
    if (!username || !password || !email) {
        return res.json({ success: false, message: "username and password is required" })
    }
    try {
        const createdUser = await authController.signup(username, email, password)
        console.log("The user is successfully created :: ", createdUser)
        return res.status(200).json({ success: true, message: "user created successfully" })
    } catch (error) {
        console.error('Error in signing up :: ', error)
        return res.status(500).json({ success: false, message: "Error in signing up the user" })
    }
})

router.post('/login', async (req, res) => {
    const { username, email, password } = req.body
    if (!(username || email) || !password) {
        return res.json({ success: false, message: "password and (username or email) is required" })
    }
    try {
        const userDetails = await authController.login(username, email, password)
        console.log("user details :: ", userDetails)
        if (userDetails) {
            const token = jwt.sign(userDetails, JWT_SIGNING_KEY, {
                expiresIn: "30m"
            })
            res.clearCookie('session_id')
            res.cookie('session_id', token)
            return res.status(200).json({ success: true, message: "Logged in sucessfully" })
        } else {
            return res.status(401).json({ success: false, message: "Invalid user or invalid password" })
        }
    } catch (error) {
        console.error('Error in logging in :: ', error)
        return res.status(500).json({ success: false, message: "Error in logging in" })
    }
})

module.exports = router;