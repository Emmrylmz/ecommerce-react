"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.retrievePurchaseHistory = void 0;

var _models = _interopRequireDefault(require("../models/models.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var retrievePurchaseHistory = function retrievePurchaseHistory(req, res) {
  var userId, parsed, user, purchaseHistory;
  return regeneratorRuntime.async(function retrievePurchaseHistory$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          userId = req.body.userId;
          parsed = JSON.parse(cachedProducts);
          _context.next = 4;
          return regeneratorRuntime.awrap(_models["default"].findById(userId));

        case 4:
          user = _context.sent;

          try {
            if (user) {
              purchaseHistory = user.purchaseHistory;
              res.send(purchaseHistory);
            }
          } catch (error) {
            console.error("Error retrieving purchaseHistory", error);
          }

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.retrievePurchaseHistory = retrievePurchaseHistory;