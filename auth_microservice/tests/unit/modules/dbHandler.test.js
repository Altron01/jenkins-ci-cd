const mysql = require('mysql');
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
        var healthStatus = { state: 'authenticated' };
        const result = dbHandler.checkHealth(healthStatus);
        expect(result.status).toBe(200);
        expect(result.msg).toBe('healthy');
    });

    test('Test database unhealth status', () => {
        var healthStatus = { state: 'disconnected' };
        const result = dbHandler.checkHealth(healthStatus);
        expect(result.status).toBe(500);
        expect(result.msg).toBe('unhealthy');
    });

    test('Test database unknown status', () => {
        var healthStatus = { state: 'unknown' };
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
        mysql.escape.mockReturnValue('A');
        dbHandler.authUser({ username: 'A', password: 'A' }, dummyCon).then(result => {
            expect(result.status).toBe(200);
        });
    });

    test('Test database user credential validation', () => {
        let dummyCon = {
            query: function (q, f) { f(null, []) }
        }
        mysql.escape.mockReturnValue('A');
        dbHandler.authUser({ username: 'A', password: 'A' }, dummyCon).then(result => {
            expect(result.status).toBe(404);
        });
    });

    test('Test database error at query', () => {
        let dummyCon = {
            query: function (q, f) { f('This is a test', []) }
        }
        mysql.escape.mockReturnValue('A');
        dbHandler.authUser({ username: 'A', password: 'A' }, dummyCon).catch(err => { 
            expect(err.status).toBe(500);
        });
        
    });

});