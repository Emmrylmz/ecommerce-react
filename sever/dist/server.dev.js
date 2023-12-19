"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getData = getData;
exports.getProducts = void 0;

var _express = _interopRequireDefault(require("express"));

var _database = _interopRequireDefault(require("./db/database.js"));

var _authRoute = _interopRequireDefault(require("./routes/authRoute.js"));

var _dotenv = require("dotenv");

var _nodeFetch = _interopRequireWildcard(require("node-fetch"));

var _cors = _interopRequireDefault(require("cors"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _productCacheMiddleware = _interopRequireDefault(require("./middlewares/productCacheMiddleware.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var port = 3000;
var url = process.env.DATA_SOURCE;
var corsOptions = {
  origin: "http://localhost:5173",
  credentials: true
};
app.use((0, _cors["default"])(corsOptions));
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use((0, _cookieParser["default"])());
app.use('/', _authRoute["default"]);
app.use(_productCacheMiddleware["default"]);

function getData(url) {
  var response, data;
  return regeneratorRuntime.async(function getData$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap((0, _nodeFetch["default"])(url));

        case 3:
          response = _context.sent;

          if (response.ok) {
            _context.next = 6;
            break;
          }

          throw new Error("Error fetching data: ".concat(response.status));

        case 6:
          _context.next = 8;
          return regeneratorRuntime.awrap(response.json());

        case 8:
          data = _context.sent;
          return _context.abrupt("return", data);

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](0);
          // Handle and log the error
          console.error(_context.t0); // Optionally return a specific error response

          return _context.abrupt("return", {
            error: _context.t0.message
          });

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 12]]);
}

var getProducts = function getProducts(req, res) {
  var response, products;
  return regeneratorRuntime.async(function getProducts$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap((0, _nodeFetch["default"])('/product'));

        case 2:
          response = _context2.sent;
          _context2.next = 5;
          return regeneratorRuntime.awrap(response.json());

        case 5:
          products = _context2.sent;
          // Use the products array in your controller logic
          res.send(products);

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.getProducts = getProducts;
(0, _database["default"])().then(app.listen(port, function () {
  console.log("Example app listening on port ".concat(port)); //Connect mongoDB
}));
app.get('/product', function _callee(req, res) {
  return regeneratorRuntime.async(function _callee$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          //query all the products
          getData(url);

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
});
app.get('/product/:id', function _callee2(req, res) {
  var productId;
  return regeneratorRuntime.async(function _callee2$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          //query Product with id
          productId = req.params.id;
          getData("".concat(url, "/").concat(productId));

        case 2:
        case "end":
          return _context4.stop();
      }
    }
  });
});