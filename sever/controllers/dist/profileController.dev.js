"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.retrievePurchaseHistory = void 0;

var _models = _interopRequireDefault(require("../models/models.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var retrievePurchaseHistory = function retrievePurchaseHistory(req, res) {
  var userId, user, purchaseHistory;
  return regeneratorRuntime.async(function retrievePurchaseHistory$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          userId = req.body.userId;
          _context.next = 3;
          return regeneratorRuntime.awrap(_models["default"].findById(userId));

        case 3:
          user = _context.sent;

          try {
            if (user) {
              purchaseHistory = user.purchaseHistory;
              res.send(purchaseHistory);
            }
          } catch (error) {
            console.error("Error retrieving purchaseHistory", error);
          }

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.retrievePurchaseHistory = retrievePurchaseHistory;