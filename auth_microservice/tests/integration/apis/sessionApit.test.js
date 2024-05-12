const axios = require('axios');
const sessionApi = require('../../../src/apis/sessionApi');

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

    test('Test user not given', () => {
        expect(sessionApi.getUserSession).toThrow('Cant evaluate session null');
    });

    test('Test axios error', () => {
        axios.get.mockReturnValue(new Promise((resolve, reject) => { throw '' }));
        sessionApi.getUserSession('ABC|CBA').catch(err => {
            expect(err.status).toBe(500); 
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

    test('Test axios error', () => {
        axios.put.mockReturnValue(new Promise((resolve, reject) => { throw '' }));
        sessionApi.putUserSession('ABC|CBA').catch(err => {
            expect(err.status).toBe(500); 
        });
    });

});
