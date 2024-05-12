const axios = require('axios');
const tokenHandler = require('../modules/tokenHandler');
const constants = require('../contants');

function getUserSession(token = '') {
    if (token.length == 0) throw new Error({ status: 400, msg: 'Cant evaluate session null'});
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
        }).catch(err => { reject(new Error({ status: 500, err })); });
    });
}

function putUserSession(token, data) { 
    session = tokenHandler.getSessionToken(token);
    return new Promise((resolve, reject) => { 
        axios.put(constants.SESSION_MS_ENDPOINT + '/session', {
                key: token,
                data
            },
        ).then(res => { 
            resolve({
                status: 200,
                msg: 'success'
            });
        }).catch(err => { reject(new Error({ status: 500, err })); });
    })
}

module.exports = { getUserSession, putUserSession }