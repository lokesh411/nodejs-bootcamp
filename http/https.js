const https = require('https')

https.get('https://httpstat.us/200?sleep=2000', (response) => {
    let str = ""
    response.on('data', (chunk) => {
        console.log("Incoming chunks :: ", chunk.toString())
        str+=chunk;
    })
    response.on('end', () => {
        console.log("received :: ", str)
    })
}).on('error', (e) => {
    console.log('Error in making a http call :: ', e)
})

https.request({
    
})

/**
 * 1. http connection
 * 2. TCP connection
 * 3. Verifying the certificate
*/