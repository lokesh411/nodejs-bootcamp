const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
console.log('Hello world')

// const promiseFn = (i) => {
//     return new Promise((resolve) => {
//         console.log(`Inside the promise function ${i} iteration`)
//         resolve(i)
//     })
// }

// const timerFn = (i) => {
//     setTimeout(() => {
//         console.log(`Inside the timer function in ${i} iteration`)
//     }, 0)
// }

// const wait = () => {
//     return new Promise(resolve => {
//         process.nextTick(resolve)
//         // process.nextTick(() => resolve())
//     })
// }

// const main = async () => {
//     for (let i = 0; i < 10; i++) {
//         console.log(`${i + 1} iteration of the loop`)
//         timerFn(i + 1)
//         promiseFn(i + 1).then((response) => console.log(`${response} promise resolved`))
//         // await wait()
//     }
// }
const main = async (data) => {
    // const hexHash = crypto.createHash('sha256').update(data).digest("base64")
    // console.log(`hash of ${data} is :: `, hexHash)
    const salt = await bcrypt.genSalt()
    console.log("generated salt :: ", salt)
    const bcryptedHash = await bcrypt.hash(data, salt) // 80ms to run
    // const bcryptedHash1 = bcrypt.hashSync(data, 10)
    // console.log("comparison of hashes", bcrypt.compareSync(data, bcryptedHash))
    console.log("Generated hash :: ", bcryptedHash)
    console.log('comparison of plain text and hashed text :: ', await bcrypt.compare(data, bcryptedHash))
}

const secret = "javainuse-secret-key"

const generateJWT = (payload) => {
    const token = jwt.sign(payload, secret, { expiresIn: "1s", algorithm: "HS512" })
    console.log('generated JWT :: ', token)
    return token;
}

const verifyJWT = (token) => {
    const decoded = jwt.verify(token, secret + "soasdf")
    console.log("decoded JWT :: ", decoded)
}

const hof = () => {
    return function(data) {
        console.log("child function :: ", data)
    }    
}

hof()("hello world child")

// childFn("hello world child")

// UTF-8

main("hello world")

// generateJWT({username: "abc", email: "abc@gmail.com"})

// verifyJWT("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFiYyIsImVtYWlsIjoiYWJjQGVtYWlsLmNvbSIsImlhdCI6MTY0NDA0MDA4NCwiZXhwIjoxNjQ0MDQwMDg1fQ.ix0u87DCcNeOxVc9PWxLrxN2HK_TV-tAuKZhB2nRy-Q")

/**
 * timer array: [callback function 1, callback function 2 ... ]
 * promise array: [promise callback function 1, promise callback function 2 ... ]
 * microtask queue: [callback function]
 */

/**
 * Iteration 1:
 * 1. call the timer function
 * 2. execute the promise -> push the callback function of the promise into the promise queue
 * Iteration 2:
 * 1. call the timer function
 * 2. execute the promise -> push the callback function of the promise into the promise queue
*/