"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

<<<<<<< HEAD
require("dotenv/config");

=======
>>>>>>> bbeb05e9ee6f5890eb29058bd2feb7c18e67accf
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var connectDB = function connectDB() {
  return regeneratorRuntime.async(function connectDB$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
<<<<<<< HEAD
          return regeneratorRuntime.awrap(_mongoose["default"].connect(process.env.MONGO_KEY).then(function () {
=======
          return regeneratorRuntime.awrap(_mongoose["default"].connect("mongodb+srv://banleue13:EmV9ymdlFExTYae6@cluster0.lvzd0dt.mongodb.net/?retryWrites=true&w=majority").then(function () {
>>>>>>> bbeb05e9ee6f5890eb29058bd2feb7c18e67accf
            console.log("something?");
          }));

        case 3:
          ({
            useNewUrlParser: true,
            useUnifiedTopology: true
          });
          console.log('Connected to database!');
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.error('Error connecting to database:', _context.t0.message);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

var _default = connectDB;
exports["default"] = _default;