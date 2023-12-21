"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redis = require("redis");

var client = (0, _redis.createClient)({
  host: '127.0.0.1',
  port: 6379
});
client.on('error', function (err) {
  return console.error('Redis Client Error', err);
});
client.on('connect', function () {
  return console.log('Redis Client Connected');
});

function setRedisValue() {
  return regeneratorRuntime.async(function setRedisValue$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(client.connect());

        case 3:
          _context.next = 5;
          return regeneratorRuntime.awrap(client.set('key', 'value'));

        case 5:
          // Use await for Redis operations
          console.log('Data stored in Redis');
          _context.next = 11;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          console.error('Redis Error:', _context.t0);

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
}

setRedisValue(); // Call the function to set the value

var _default = client;
exports["default"] = _default;