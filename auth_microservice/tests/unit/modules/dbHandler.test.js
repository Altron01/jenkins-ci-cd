const mysql = require('mysql');
const crypto = require("crypto");
const dbHandler = require('../../../src/modules/dbHandler');

jest.mock('mysql');

describe('Database instantiation', () => {

    test('Test database creation instance first time', () => {
        let dummyCon = {
            connect: function (f) { f() },
            status: 200
        }
        mysql.createConnection.mockReturnValue(dummyCon);
        const result = dbHandler.startConnection();
        expect(result.status).toBe(200);
    });

    test('Test database creation instance second time', () => {
        let dummy = { status: 200 };
        const result = dbHandler.startConnection(dummy);
        expect(result.status).toBe(200);
    });

    test('Test database error at connect', () => {
        let dummyCon = {
            connect: function (f) { f('This is a test') }
        }
        mysql.createConnection.mockReturnValue(dummyCon);
        expect(dbHandler.startConnection).toThrow('This is a test');
    });

});

describe('Database health status', () => {

    test('Test database healthy status', () => {
        let healthStatus = { state: 'authenticated' };
        const result = dbHandler.checkHealth(healthStatus);
        expect(result.status).toBe(200);
        expect(result.msg).toBe('healthy');
    });

    test('Test database unhealth status', () => {
        let healthStatus = { state: 'disconnected' };
        const result = dbHandler.checkHealth(healthStatus);
        expect(result.status).toBe(500);
        expect(result.msg).toBe('unhealthy');
    });

    test('Test database unknown status', () => {
        let healthStatus = { state: 'unknown' };
        const result = dbHandler.checkHealth(healthStatus);
        expect(result.status).toBe(500);
        expect(result.msg).toBe('unknown');
    });
    
});

describe('Database user authentication', () => {

    test('Test database user credential validation', () => {
        let dummyCon = {
            query: function (q, f) { f(null, [ 0 ]) }
        }
        let password = crypto.randomBytes(10).toString('hex').slice(0, 40);
        mysql.escape.mockReturnValue('A');
        dbHandler.authUser({ username: 'A', password }, dummyCon).then(result => {
            expect(result.status).toBe(200);
        });
    });

    test('Test database user credential validation', () => {
        let dummyCon = {
            query: function (q, f) { f(null, []) }
        }
        let password = crypto.randomBytes(10).toString('hex').slice(0, 40);
        mysql.escape.mockReturnValue('A');
        dbHandler.authUser({ username: 'A', password }, dummyCon).then(result => {
            expect(result.status).toBe(404);
        });
    });

    test('Test database error at query', () => {
        let dummyCon = {
            query: function (q, f) { f('This is a test', []) }
        }
        let password = crypto.randomBytes(10).toString('hex').slice(0, 40);
        mysql.escape.mockReturnValue('A');
        expect(dbHandler.authUser({ username: 'A', password }, dummyCon)).rejects.toThrow();
        
    });

});
