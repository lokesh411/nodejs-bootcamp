const express = require('express')
require('dotenv').config({ path: ".env" })
const userRouter = require('./routes/user.js')
const authRouter = require('./routes/auth')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const { statusCodeMapping } = require('./constants')
const path = require('path')
const cookieParser = require('cookie-parser')
const JWT_SIGNING_KEY = process.env.JWT_SIGNING_KEY

const app = express()

app.use(express.json())
app.use(cors({ origin: "https://docs.google.com" }))
app.use(cookieParser())
// app.use(express.static(path.join(__dirname, 'frontend/build')))
// app.use(csp({
//     useDefaults: true,
//     directives: {
//         defaultSrc: ["'self'"],
//         scriptSrc: ["'self'"],
//         objectSrc: ["'none'"],
//         upgradeInsecureRequests: [],
//     },
//     reportOnly: false,
// }))

console.log('list of all env variables :: ', process.env.PASSWORD, process.env.USERNAME)

console.log("directory name in the server.js file :: ", __dirname)
console.log("file name in server.js file :: ", __filename)

console.log("absolute path of marks.js file in server.js file is ::  ", path.join(__dirname, "routes/marks.js"))

app.use('/health-check', (req, res) => {
    return res.json({ message: "service is working fine" })
})

// app.use('/', (_req, res) => {
//     return res.sendFile(path.join(__dirname, 'frontend/build'))
// })

app.use((req, res, next) => {
    console.log("req.body in the middleware :: ", req.body)
    // res.json({ message: "resolving in the middleware itself" })
    next()
})

// app.get('/hello', (req, res) => {
//     console.log("req.path :: ", req.path)
//     res.send({ welcome: "Hello world" })
// })

// app.post("/hello", (req, res) => {
//     console.log("request body::", req.body)
//     res.send({ message: "Helo world string" })
// })

// app.put("/hello", (req, res) => {
//     res.send({ message: "Response from the put method" })
// })

// app.delete("/hello", (req, res) => {
//     res.send({ message: "response from delete method" })
// })

app.use((req, res, next) => {
    res.sendResponse = (status, data) => {
        return res.status(status).json({ data, message: statusCodeMapping[status.toString()] })
        // if (status == 200) {
        //     return res.status(status).json({ data, message: "OK" })
        // }
        // if (status == 400) {
        //     return res.status(status).json({ data, message: "Bad request" })
        // }
    }
    next()
})

app.use('/api/auth', authRouter)

app.use((req, res, next) => {
    if (req.cookies.session_id) {
        try {
            userDetails = jwt.verify(req.cookies.session_id, JWT_SIGNING_KEY)
            console.log("user details :: ", userDetails)
            req.user = userDetails
        } catch (error) {
            console.error('Error in verifying JWT :: ', error)
            return res.status(401).json({ success: false, message: "Invalid session" })
        }
        next()
    } else {
        return res.status(401).json({ success: false, message: "un-authenticated user" })
    }
})

app.use('/api/user', userRouter)

app.use("/api/hello", (req, res) => {
    console.log("req.body :: ", req.body)
    res.json({ message: "Inside app.use request handler" })
})

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})