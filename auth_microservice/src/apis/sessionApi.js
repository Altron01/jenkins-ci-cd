const axios = require('axios');
const tokenHandler = require('../modules/tokenHandler');
const constants = require('../contants');

function getUserSession(token='') { 
    session = tokenHandler.getSessionToken(token);
    return new Promise((resolve, reject) => { 
        axios.get(constants.SESSION_MS_ENDPOINT.concat('/session'), {
            params: {
                session
            }
        }).then(res => {
            resolve({
                token,
                data: (res.msg === "not found" ? null : res.data)
            });
        }).catch(err => { reject(err) });
    })
}

function putUserSession(token, data) { 
    session = tokenHandler.getSessionToken(token);
    return new Promise((resolve, reject) => { 
        console.log(JSON.stringify({
                key: token,
                data
            }))
        axios.put(constants.SESSION_MS_ENDPOINT.concat('/session'), {
                key: token,
                data
            },
        ).then(res => { 
            resolve({
                status: 200,
                msg: 'success'
            });
        }).catch(err => {
            reject(err);
        })
    })
}

module.exports = { getUserSession, putUserSession }