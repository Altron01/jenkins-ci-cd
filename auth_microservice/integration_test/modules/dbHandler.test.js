const dbHandler = require('./modules/dbHandler')

test('Test start db connection', () => {
    let dbCon = dbHandler.startConnection();
    expect(token).not.toBeNull();
    expect(token).not.toBeUndefined();
    expect(splitToken.length).toBe(2);
    expect(splitToken[1].length).toBeGreaterThan(0);
});