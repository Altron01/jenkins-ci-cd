const tokenHandler = require('../../../src/modules/tokenHandler');

describe('Test session token generation', () => {

    test('Test session token generation with given string', () => {
        let startingChaing = 'test_user';
        let token = tokenHandler.createSessionToken(startingChaing);
        let splitToken = token.split('|');
        expect(token).not.toBeNull();
        expect(token).not.toBeUndefined();
        expect(splitToken.length).toBe(2);
        expect(splitToken[1].length).toBeGreaterThan(0);
    });

    test('Test session token generation with no given string', () => {
        expect(tokenHandler.createSessionToken).toThrow()
    });

});

describe('Test session token', () => {

    test('Test session token retrieval', () => {
        let startingChaing = 'test_user';
        let token = tokenHandler.createSessionToken(startingChaing);
        let splitToken = tokenHandler.getSessionToken(token);
        expect(splitToken).not.toBeNull();
        expect(splitToken).not.toBeUndefined();
        expect(splitToken).toBe(startingChaing);

    });

    test('Test session token retreival with no given string', () => {
        expect(tokenHandler.getSessionToken).toThrow()
    });

});