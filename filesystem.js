const fs = require('fs')

/**
 * 1. creating a file
 * 2. writing to a file
 * 3. reading a file
 * 4. view the stats of a file
*/

const createFileAsync = () => {
    fs.appendFile('sample.txt', "\nhello world\n", (err) => {
        if (err) {
            console.error('Error in creating a file and appending to a file :: ', error)
            return;
        }
        console.log('File operation successful')
    })
}

const createFile = () => {
    fs.appendFileSync('syncsample.txt', "\nhello world\n")
    console.log('File operation successful')
}

const readFile = () => {
    // const readBuffer = fs.readFileSync("sample.txt")
    fs.readFile("sample.txt", (err, data) =>{
        if(err) {
            console.error('Error in reading the file :: ', err)
            return;
        }
        console.log('Read successful :: ', data.toString())
    })
    // console.log(readBuffer.toString())
}

const statFile = () => {
    fs.stat("sample.txt", (err, stats) => {
        if(err) {
            console.error('Error in fetching stat of the file :: ', err)
            return;
        }
        console.log('Read stat successful :: ', stats)
    })
}

// createFile()
statFile()