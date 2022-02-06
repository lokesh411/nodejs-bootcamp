const { client: mongoClient } = require('../models/mongodb')

const dbConnection = mongoClient.db('guvi_experiments')
const collection = dbConnection.collection('users')

const create = async (username, emailId, age, firstname, lastname) => {
    const response = await collection.insertOne({ username, emailId, age, firstname, lastname })
    console.log("response of created document ", response)
    return response;
}

const getAll = () => {
    return collection.find().toArray()
}

const update = (email, fieldsToUpdate) => {
    console.log('fields to updatE :: ', fieldsToUpdate, email)
    return collection.updateOne({ emailId: email }, { $set: fieldsToUpdate })
}

const deleteRecord = (email) => {
    return collection.deleteOne({ emailId: email })
}

module.exports = {
    create,
    getAll,
    update,
    deleteRecord
}