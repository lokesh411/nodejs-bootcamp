const os = require('os')
worker_threads

// console.log("The number of cores that the CPU has :: ", os.cpus())

// console.log("hostname :: ", os.hostname())
console.log("total memory available in the os :: ", os.totalmem()/(1024*1024*1024))
console.log("free memory available in the os :: ", os.freemem()/(1024*1024*1024))