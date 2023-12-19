"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkout = void 0;

var _models = _interopRequireDefault(require("../models/models.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var checkout = function checkout(req, res) {
  var products, _req$body, userId, cartItems, user, purchasedProducts, totalAmount;

  return regeneratorRuntime.async(function checkout$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          products = req.data || []; // Define fallback if cache is empty

          console.log(products);
          _context2.prev = 2;
          _req$body = req.body, userId = _req$body.userId, cartItems = _req$body.cartItems;
          _context2.next = 6;
          return regeneratorRuntime.awrap(_models["default"].findById(userId).populate('purchaseHistory'));

        case 6:
          user = _context2.sent;
          _context2.next = 9;
          return regeneratorRuntime.awrap(Promise.all(cartItems.map(function _callee(_ref) {
            var productId, quantity, product;
            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    productId = _ref.productId, quantity = _ref.quantity;
                    _context.next = 3;
                    return regeneratorRuntime.awrap(products.findById(productId));

                  case 3:
                    product = _context.sent;

                    if (product) {
                      _context.next = 6;
                      break;
                    }

                    throw new Error("Product with ID ".concat(productId, " not found."));

                  case 6:
                    return _context.abrupt("return", {
                      product: product,
                      quantity: quantity,
                      subTotal: product.price * quantity
                    });

                  case 7:
                  case "end":
                    return _context.stop();
                }
              }
            });
          })));

        case 9:
          purchasedProducts = _context2.sent;
          totalAmount = purchasedProducts.reduce(function (sum, _ref2) {
            var subTotal = _ref2.subTotal;
            return sum + subTotal;
          }, 0);
          user.purchaseHistory.push({
            datePurchased: new Date(),
            items: purchasedProducts,
            totalAmount: totalAmount
          });
          _context2.next = 14;
          return regeneratorRuntime.awrap(user.save());

        case 14:
          res.send({
            message: 'Purchase successful!',
            orderDetails: user.purchaseHistory[user.purchaseHistory.length - 1]
          });
          _context2.next = 20;
          break;

        case 17:
          _context2.prev = 17;
          _context2.t0 = _context2["catch"](2);
          res.status(500).json({
            error: _context2.t0.message
          });

        case 20:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[2, 17]]);
};

exports.checkout = checkout;