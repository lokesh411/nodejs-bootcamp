const express = require('express')
const userController = require('../controller/user')
const authMiddlewares = require('../middlewares/authorize')

// const ROLES = ["ADMIN_USER", "SUPPORT_USER"]

const router = express.Router()



console.log("directory name in the user.js file :: ", __dirname)
console.log("file name in user.js file :: ", __filename)

router.post('/create', authMiddlewares.authorizeUser("ADMIN_USER"), async (req, res) => {
    console.log("Reached /create route :: ", req.user)
    console.log('query params::', req.query)
    console.log('data in body :: ', req.body)
    res.setHeader("x-api-key", "some_experiments")
    req.on('close', () => {
        console.log("client has closed the connection")
    })
    try {
        await userController.create(req.body.username, req.body.email, req.body.age, req.body.firstname, req.body.lastname)
        return res.json({ message: "created successfully" })
    } catch (error) {
        console.error("Error in creating user record :: ", error)
        return res.status(500).json({ message: "Error in creating the data" })
    }

    // const sampleFun = () => {
    //     if (Math.ceil(Math.random() * 1000) % 2 === 0) {
    //         res.sendResponse(200, { message: "user has been created" })
    //     }
    // }
    // sampleFun()
    // if (!res.headersSent) {
    //     res.status(202).send({ message: "user has been created" })
    // }
})

router.get('/', async (req, res) => {
    try {
        const students = await userController.getAll()
        return res.json({ students, message: "fetched successfully" })
    } catch (error) {
        console.error("Error in fetching students data :: ", error)
        return res.status(500).json({ message: "Error in fetching the data" })
    }
})

router.get('/:id', (req, res) => {
    console.log("params in the request ", req.params)
    res.sendStatus(200)
})

router.put('/', authMiddlewares.authorizeUser("ADMIN_USER"), async (req, res) => {
    const { email, fieldsToUpdate } = req.body
    if (!email || !fieldsToUpdate) {
        return res.status(400).json({ message: "Bad requests, email and fieldsToUpdate is not found or not valid" })
    }
    try {
        const response = await userController.update(email, fieldsToUpdate)
        console.log('Response from the updation api :: ', response)
        return res.json({ message: "updated successfully" })
    } catch (error) {
        console.error("Erorr in updating the user :: ", error)
        return res.status(500).json({ message: "Error in updating the data" })
    }
})

router.delete('/', authMiddlewares.authorizeUser("ADMIN_USER"), async (req, res) => {
    const { email } = req.body
    if (!email) {
        return res.status(400).json({ message: "Bad requests, email is not found or not valid" })
    }
    try {
        const response = await userController.deleteRecord(email)
        console.log('Deleted documents successfully :: ', response)
        return res.json({ message: "deleted successfully" })
    } catch (error) {
        console.error("Erorr in deleting the user :: ", error)
        return res.status(500).json({ message: "Error in deleting the data" })
    }
})
// export default router;

module.exports = router;


// /user/create


// <button>