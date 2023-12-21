"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = cacheMiddleware;

var _express = _interopRequireDefault(require("express"));

var _redis = _interopRequireDefault(require("../redis.js"));

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function cacheMiddleware(req, res, next) {
  var cachedData, response, data;
  return regeneratorRuntime.async(function cacheMiddleware$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_redis["default"].get("1"));

        case 3:
          cachedData = _context.sent;

          if (!cachedData) {
            _context.next = 9;
            break;
          }

          console.log('Serving data from cache');
          next();
          _context.next = 18;
          break;

        case 9:
          _context.next = 11;
          return regeneratorRuntime.awrap((0, _nodeFetch["default"])("https://fakestoreapi.com/products"));

        case 11:
          response = _context.sent;
          _context.next = 14;
          return regeneratorRuntime.awrap(response.json());

        case 14:
          data = _context.sent;
          _context.next = 17;
          return regeneratorRuntime.awrap(_redis["default"].set(key, JSON.parse(data), 60 * 60));

        case 17:
          // Cache raw data
          next();

        case 18:
          _context.next = 23;
          break;

        case 20:
          _context.prev = 20;
          _context.t0 = _context["catch"](0);
          console.error("Error in cache middleware:", _context.t0); // Handle the error gracefully, e.g., send a custom error response

        case 23:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 20]]);
}