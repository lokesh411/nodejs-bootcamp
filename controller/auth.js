const { client: mongoClient } = require('../models/mongodb')
const bcrypt = require('bcrypt')
const collection = mongoClient.db("auth").collection("user")

const signup = async (username, email, password) => {
    // const hashOfPassword = crypto.createHash("sha256").update(password).digest('hex')
    const hashOfPassword = await bcrypt.hash(password, 10)
    return collection.insertOne({ username, email, password: hashOfPassword })
}

const login = async (username, email, password) => {
    const query = {}
    if (username) {
        query.username = username
    } else if (email) {
        query.email = email
    } else {
        throw new Error("username and password not present")
    }
    const userDetails = await collection.findOne(query)
    if (!userDetails) {
        return false;
    }
    storedPassword = userDetails.password
    try {
        await bcrypt.compare(password, storedPassword)
    } catch (err) {
        return
    }
    delete userDetails.password
    return userDetails
}

module.exports = {
    signup,
    login
}

/**
 * jwtKey = "javainuse-secret-key"
 * userdetails = {username: "abc", email: "abc@gmail.com"} -> random string -> 
 */