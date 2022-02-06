const http = require('http');

const sleep = () => {
    return new Promise(resolve => {
        setTimeout(resolve, 4000)
    })
}

const requestListener = async (req, res) => {
    if (req.path === 'hello' && req.method === "GET") {

    }
    await sleep()
    res.end("hello world hello world hello world hello world hello world hello world hello world v hello worldhello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world v hello worldhello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world v hello worldhello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world")
}

const server = http.createServer(requestListener)
server.listen(4000, () => {
    console.log('Server is listening at 4000')
})

/**
 * 1. HTTP connection
 * 2. TCP handshake with the client, (SYN, ACK, ACK)
 * 3. closes the connection
*/