// www.google.com -> 142.250.183.68
const dns = require('dns')

/**
 * dns lookup
 * dns resolve
*/
const lookup = () => {
    dns.lookup('local-prod.ym.com', (err, address) => {
        if(err) {
            console.error('Error in fetching dns address :: ', err)
            return;
        }
        console.log('Address :: ', address)
    })
}

const resolve = () => {
    dns.resolve('local-prod.ym.com', (err, address) => {
        if(err) {
            console.error('Error in fetching dns address :: ', err)
            return;
        }
        console.log('Address :: ', address)
    })
}


// lookup()
resolve()