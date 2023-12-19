"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _models = _interopRequireDefault(require("../models/models.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post('/signup', function _callee(req, res) {
  var _req$body, email, password, hashedPassword, newUser;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, email = _req$body.email, password = _req$body.password;
          _context.next = 4;
          return regeneratorRuntime.awrap(bcrypt.hash(password, 10));

        case 4:
          hashedPassword = _context.sent;
          newUser = new _models["default"]({
            email: email,
            password: hashedPassword
          });
          _context.next = 8;
          return regeneratorRuntime.awrap(newUser.save());

        case 8:
          res.status(201).send({
            message: 'User successfully created'
          });
          _context.next = 15;
          break;

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);
          res.status(500).send({
            message: 'Internal server error'
          });

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 11]]);
});
var _default = router;
exports["default"] = _default;