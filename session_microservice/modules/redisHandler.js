const redis = require('redis');
const constants = require('../contants');

var client = null;

function startConnection() {
    if (client !== null)
        return client;
    redis.createClient({
        url: constants.REDIS_URL
    }).on('connect', function () {
        console.log('connected');
    }).on('error', function (err) {
        console.log(err);
    })
    client.connect();
    return client;
}

function getSession(sessionToken, con=client) {
    return new Promise((resolve, reject) => { 
        con.get(sessionToken).then(res => { 
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


function putSession(sessionToken, data, con=client) {
    return new Promise((resolve, reject) => {
        con.set(sessionToken, data).then(res => { 
            resolve({
                msg: 'session created'
            });
        }).catch(err => { 
            reject(err);
        })
    })
}

module.exports = { startConnection, getSession, putSession }