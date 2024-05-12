const axios = require('axios');
const tokenHandler = require('../modules/tokenHandler');
const constants = require('../contants');

function getUserSession(token='') {
    if (token.length == 0) throw 'Cant evaluate session null';
    session = tokenHandler.getSessionToken(token);
    return new Promise((resolve, reject) => {
        axios.get(constants.SESSION_MS_ENDPOINT + '/session', {
            params: {
                session
            }
        }).then(res => {
            resolve({
                token,
                data: (res.msg === "not found" ? null : res.data)
            });
        }).catch(err => { reject({ status: 500, err }) });
    });
}

function putUserSession(token, data) { 
    session = tokenHandler.getSessionToken(token);
    return new Promise((resolve, reject) => { 
        console.log(JSON.stringify({
                key: token,
                data
            }))
        axios.put(constants.SESSION_MS_ENDPOINT + '/session', {
                key: token,
                data
            },
        ).then(res => { 
            resolve({
                status: 200,
                msg: 'success'
            });
        }).catch(err => {
            reject({ status: 500, err });
        })
    })
}

module.exports = { getUserSession, putUserSession }