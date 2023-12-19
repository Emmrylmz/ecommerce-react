"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logout = exports.login = exports.signup = void 0;

var _models = _interopRequireDefault(require("../models/models.js"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcrypt = _interopRequireWildcard(require("bcrypt"));

require("dotenv/config");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var signup = function signup(req, res) {
  var user, hashedPassword, _user;

  return regeneratorRuntime.async(function signup$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_models["default"].findOne({
            email: req.body.email
          }));

        case 3:
          user = _context.sent;

          if (!user) {
            _context.next = 8;
            break;
          }

          return _context.abrupt("return", res.status(400).send('That user already exisits!'));

        case 8:
          _context.next = 10;
          return regeneratorRuntime.awrap(_bcrypt["default"].hash(req.body.password, 10));

        case 10:
          hashedPassword = _context.sent;
          _user = new _models["default"]({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
          });
          _context.next = 14;
          return regeneratorRuntime.awrap(_user.save());

        case 14:
          res.send(_user);

        case 15:
          _context.next = 20;
          break;

        case 17:
          _context.prev = 17;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            error: 'could not create the user 500'
          });

        case 20:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 17]]);
};

exports.signup = signup;

var login = function login(req, res) {
  var _req$body, email, password, user, passwordMatch, token;

  return regeneratorRuntime.async(function login$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, email = _req$body.email, password = _req$body.password;
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(_models["default"].findOne({
            email: email
          }));

        case 4:
          user = _context2.sent;

          if (user) {
            _context2.next = 7;
            break;
          }

          return _context2.abrupt("return", res.status(401).json({
            message: 'Invalid email or password'
          }));

        case 7:
          _context2.next = 9;
          return regeneratorRuntime.awrap(_bcrypt["default"].compare(password, user.password));

        case 9:
          passwordMatch = _context2.sent;

          if (passwordMatch) {
            _context2.next = 12;
            break;
          }

          return _context2.abrupt("return", res.status(401).json({
            message: 'Invalid email or password'
          }));

        case 12:
          token = _jsonwebtoken["default"].sign({
            userId: user._id
          }, process.env.JWT_SECRET_KEY, {
            expiresIn: '1h'
          });
          user.token = token;
          res.cookie("access_token", token, {
            httpOnly: false
          }).status(200).json({
            user: {
              userid: user._id,
              username: user.name
            }
          });
          _context2.next = 21;
          break;

        case 17:
          _context2.prev = 17;
          _context2.t0 = _context2["catch"](1);
          console.error('Login error:', _context2.t0);
          res.status(500).json({
            message: 'Internal server error'
          });

        case 21:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 17]]);
};

exports.login = login;

var logout = function logout(req, res) {
  return regeneratorRuntime.async(function logout$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          // Replace "ACCESS_TOKEN_COOKIE_NAME" with your actual cookie name
          res.clearCookie("access_token", {
            path: "/"
          }); // Implement token verification and session invalidation logic here
          // ...

          return _context3.abrupt("return", res.status(200).json({
            message: 'User has been logged out.'
          }));

        case 2:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.logout = logout;