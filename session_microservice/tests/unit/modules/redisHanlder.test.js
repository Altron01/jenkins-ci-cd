const redis = require('redis');
const redisHandler = require('../../../src/modules/redisHandler');

jest.mock('redis');

var clientResponse = {
  on: function (_message, f) {
    return {
      on: function (_m, _f) {
        if (_message == 'connect') return { connect: function () { }, isReady: true }
        if (_message == 'error') return { msg: 'error', status: 500, isReady: false }
        return { msg: 'error', status: 500, isReady: false }
      }
    }
  },
  isReady: true
}

describe('Redis connection instantiate', () => {

  test('Test Redis creation instance first time', () => {
    redis.createClient.mockReturnValue(clientResponse);
    var client = redisHandler.startConnection();
    expect(client.isReady).toBe(true);
  });

  test('Test database creation instance second time', () => {
    var client = redisHandler.startConnection(clientResponse);
    expect(client.isReady).toBe(true);
  });

});

describe('Redis get session', () => {
  test('Test success get a session', () => {
    redisHandler.getSession('', { get: function (token) { return Promise.resolve('{ "status": "200" }') } }).then(res => {
      expect(res.data.status).toBe('200');
    });
  });
  test('Test success get a session not found', () => {
    redisHandler.getSession('', { get: function (token) { return Promise.resolve(null) } }).then(res => {
      expect(res.data).toBe(null);
    });
  });
  test('Test failed get a session', () => {
    redisHandler.getSession('', { get: function (token) { return Promise.reject('Error!') } }).catch(err => { 
      expect(err).toBe('Error!');
    });
  });
});

describe('Redis put session', () => {
  test('Test success put a session', () => {
    redisHandler.putSession('', {}, { set: function (token, obj) { return Promise.resolve() } }).then(res => {
      expect(res.msg).toBe('session created');
    });
  });
  test('Test failed put a session', () => {
    redisHandler.putSession('', {}, { set: function (token, obj) { return Promise.reject('Error!') } }).catch(err => { 
      expect(err).toBe('Error!');
    });
  });
});