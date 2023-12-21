"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkout = void 0;

var _models = _interopRequireDefault(require("../models/models.js"));

var _redis = _interopRequireDefault(require("../redis.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var checkout = function checkout(req, res) {
  var cachedProducts, parsed, _req$body, userId, cartItems, user, purchasedProducts, totalAmount, newPurchase;

  return regeneratorRuntime.async(function checkout$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_redis["default"].get("1"));

        case 2:
          cachedProducts = _context.sent;
          parsed = JSON.parse(cachedProducts);
          _context.prev = 4;
          _req$body = req.body, userId = _req$body.userId, cartItems = _req$body.cartItems; // Fetch user with populated purchases

          _context.next = 8;
          return regeneratorRuntime.awrap(_models["default"].findById(userId).populate('purchaseHistory'));

        case 8:
          user = _context.sent;
          _context.next = 11;
          return regeneratorRuntime.awrap(Promise.all(cartItems.map(function (_ref) {
            var productId = _ref.id,
                quantity = _ref.quantity;
            var product = parsed.find(function (object) {
              return object.id === productId;
            });

            if (!product) {
              throw new Error("Product with ID ".concat(productId, " not found."));
            }

            return {
              id: productId,
              quantity: quantity,
              subTotal: product.price * quantity
            };
          })));

        case 11:
          purchasedProducts = _context.sent;
          totalAmount = purchasedProducts.reduce(function (sum, _ref2) {
            var subTotal = _ref2.subTotal;
            return sum + subTotal;
          }, 0);
          newPurchase = {
            datePurchased: new Date(),
            items: purchasedProducts,
            totalAmount: totalAmount
          };
          user.purchaseHistory.push(newPurchase);
          _context.next = 17;
          return regeneratorRuntime.awrap(user.save());

        case 17:
          res.status(200).json({
            message: 'Purchase successful!',
            orderDetails: user.purchaseHistory[user.purchaseHistory.length - 1]
          });
          _context.next = 24;
          break;

        case 20:
          _context.prev = 20;
          _context.t0 = _context["catch"](4);
          console.error(_context.t0);
          res.status(500).json({
            error: _context.t0.message || 'Internal Server Error'
          });

        case 24:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[4, 20]]);
};

exports.checkout = checkout;