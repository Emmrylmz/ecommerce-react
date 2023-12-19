"use strict";

var mongoose = require('mongoose');

var connectDB = function connectDB() {
  return regeneratorRuntime.async(function connectDB$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(mongoose.connect("mongodb+srv://banleue13:EmV9ymdlFExTYae6@cluster0.lvzd0dt.mongodb.net/?retryWrites=true&w=majority").then(function () {
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

module.exports = {
  connectDB: connectDB
};