const http = require('http');

const callback = (response) => {
    let str = "";
    response.on("data", (chunk) => {
        console.log("chunk :: ", chunk.toString())
        // Internal type cast of chunk from Buffer to String
        str += chunk
    })
    response.on('end', () => {
        console.log("The connection is ended, the response is :: ", str)
    })
}

http.request({
    host: "localhost",
    port: 4000,
    method: "GET"
}, callback).end()