const redis = require('redis')
const constants = require('../contants')

var client = redis.createClient({
    url: constants.REDIS_URL
}).on('connect', function () {
    console.log('connected');
}).on('error', function(err) {
    console.log(err);
})

client.connect()

function getSession(sessionToken) {
    return new Promise((resolve, reject) => { 
        client.get(sessionToken).then(res => { 
            if (res === null) {
                resolve({
                    msg: 'not found',
                    data: null
                })
            } else {
                resolve({
                    msg: 'found',
                    data: JSON.parse(res)
                })
            }
        }).catch(err => {
            reject(err)
        })
    })
}


function putSession(sessionToken, data) {
    return new Promise((resolve, reject) => {
        client.set(sessionToken, data).then(res => { 
            resolve({
                msg: 'session created'
            })
        }).catch(err => { 
            reject(err)
        })
    })
}

module.exports = { getSession, putSession }