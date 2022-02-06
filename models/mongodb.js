const mongodb = require('mongodb')
const mongodbPassword = process.env.MONGODB_PASSWORD

// const url = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000" // local url
// remote url
const url = `mongodb+srv://shinchan:${mongodbPassword}@avslive.vhivy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

const client = new mongodb.MongoClient(url)

client.connect().catch(err => {
    console.error("Error in connecting to mongodb :: ", err)
})

// model view controller

/**
 * mode -> database
 * view -> route handlers
 * controller -> one that connects with the database and does some functions and is called by the route
 */

module.exports = {
    client
}