const tokenHandler = require('../../src/modules/tokenHandler');

test('Test session token generation', () => {
    let startingChaing = 'test_user';
    let token = tokenHandler.createSessionToken(startingChaing);
    let splitToken = token.split('|');
    expect(token).not.toBeNull();
    expect(token).not.toBeUndefined();
    expect(splitToken.length).toBe(2);
    expect(splitToken[1].length).toBeGreaterThan(0);
});

test('Test session token retrieval', () => {
    let startingChaing = 'test_user';
    let token = tokenHandler.createSessionToken(startingChaing);
    let splitToken = token.split('|');
    expect(token).not.toBeNull();
    expect(token).not.toBeUndefined();
    expect(splitToken.length).toBe(2);
    expect(splitToken[0]).toBe(startingChaing);
});