const axios = require('axios');
const sessionApi = require('../../../src/apis/sessionApi');

jest.mock('axios');

describe('Session API Get User session', () => {

    test('Test user is found', () => {
        let dummyUser = {
            data: {}
        }
        axios.get.mockReturnValue(Promise.resolve(dummyUser));
        sessionApi.getUserSession('ABC|CBA').then(result => {
            expect(result.token).toBe('ABC|CBA'); 
        });
    });

    test('Test user not found', () => {
        let dummyUser = {
            msg: 'not found'
        }
        axios.get.mockReturnValue(Promise.resolve(dummyUser));
        sessionApi.getUserSession('ABC|CBA').then(result => {
            expect(result.token).toBe('ABC|CBA'); 
        });
    });

    test('Test user not given', () => {
        expect(sessionApi.getUserSession).toThrow();
    });

    test('Test axios error', () => {
        axios.get.mockReturnValue(Promise.reject(new Error({  })));
        expect(sessionApi.getUserSession('ABC|CBA')).rejects.toThrow();
    });

});

describe('Session API Put User session', () => {

    test('Test user session added', () => {
        let dummyUser = {
            data: {}
        }
        axios.put.mockReturnValue(Promise.resolve(dummyUser));
        sessionApi.putUserSession('ABC|CBA', {}).then(result => {
            expect(result.status).toBe(200); 
        });
    });

    test('Test axios error', () => {
        axios.put.mockReturnValue(Promise.reject(new Error({})));
        expect(sessionApi.putUserSession('ABC|CBA')).rejects.toThrow();
    });

});
