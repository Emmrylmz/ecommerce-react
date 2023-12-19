"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = cacheMiddleware;

var _express = _interopRequireDefault(require("express"));

var _redis = _interopRequireDefault(require("redis"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Choose your caching library
var client = _redis["default"].createClient();

function fetchApiData(id) {
  var apiResponse;
  return regeneratorRuntime.async(function fetchApiData$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(axios.get("https://fakestoreapi.com/products/".concat(id)));

        case 2:
          apiResponse = _context.sent;
          console.log("Request sent to the API");
          return _context.abrupt("return", apiResponse.data);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
}

function cacheMiddleware(req, res, next) {
  var key = req.params.productId; // Define your cache key logic (e.g., URL, params)

  client.get(key, function _callee(err, cachedData) {
    var response, data;
    return regeneratorRuntime.async(function _callee$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!err) {
              _context2.next = 3;
              break;
            }

            console.error(err);
            return _context2.abrupt("return", next(err));

          case 3:
            if (!cachedData) {
              _context2.next = 6;
              break;
            }

            // Send cached data if present
            console.log('Serving data from cache');
            return _context2.abrupt("return", res.send(JSON.parse(cachedData)));

          case 6:
            _context2.prev = 6;
            _context2.next = 9;
            return regeneratorRuntime.awrap(fetch(req.originalUrl));

          case 9:
            response = _context2.sent;
            _context2.next = 12;
            return regeneratorRuntime.awrap(response.json());

          case 12:
            data = _context2.sent;
            _context2.next = 15;
            return regeneratorRuntime.awrap(client.set(key, JSON.stringify(data), 60 * 60));

          case 15:
            // 1 hour TTL
            // Send data and proceed to next middleware
            res.send(data);
            next();
            _context2.next = 23;
            break;

          case 19:
            _context2.prev = 19;
            _context2.t0 = _context2["catch"](6);
            console.error(_context2.t0);
            next(_context2.t0); // Handle fetch errors

          case 23:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[6, 19]]);
  });
}