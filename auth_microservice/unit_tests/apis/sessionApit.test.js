const axios = require('axios');
const tokenHandler = require('../../src/modules/tokenHandler');
const sessionApi = require('../../src/apis/sessionApi');

jest.mock('axios');

describe('Session API Get User session', () => {

    test('Test user is found', () => {
        let dummyUser = {
            data: {}
        }
        axios.get.mockReturnValue(new Promise((resolve, reject) => { resolve(dummyUser) }));
        sessionApi.getUserSession('ABC|CBA').then(result => {
            expect(result.token).toBe('ABC|CBA'); 
        });
    });

    test('Test user not found', () => {
        let dummyUser = {
            msg: 'not found'
        }
        axios.get.mockReturnValue(new Promise((resolve, reject) => { resolve(dummyUser) }));
        sessionApi.getUserSession('ABC|CBA').then(result => {
            expect(result.token).toBe('ABC|CBA'); 
        });
    });

});

describe('Session API Put User session', () => {

    test('Test user session added', () => {
        let dummyUser = {
            data: {}
        }
        axios.put.mockReturnValue(new Promise((resolve, reject) => { resolve(dummyUser) }));
        sessionApi.putUserSession('ABC|CBA', {}).then(result => {
            expect(result.status).toBe(200); 
        });
    });

});

//function putUserSession(token, data) { 
//    session = tokenHandler.getSessionToken(token)
//    return new Promise((resolve, reject) => { 
//        console.log(JSON.stringify({
//                key: token,
//                data
//            }))
//        axios.put(constants.SESSION_MS_ENDPOINT.concat('/session'), {
//                key: token,
//                data
//            },
//        ).then(res => { 
//            resolve({
//                msg: 'success'
//            })
//        }).catch(err => {
//            reject(err)
//        })
//    })
//}
//
//module.exports = { getUserSession, putUserSession }