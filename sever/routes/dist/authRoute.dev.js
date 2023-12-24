"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _AuthController = require("../controllers/AuthController.js");

var _checkoutController = require("../controllers/checkoutController.js");

var _productCacheMiddleware = _interopRequireDefault(require("../middlewares/productCacheMiddleware.js"));

var _authMiddleware = _interopRequireDefault(require("../middlewares/authMiddleware.js"));

var _profileController = require("../controllers/profileController.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post("/signup", _AuthController.signup);
router.post("/login", _AuthController.login);
router.get("/logout", _AuthController.logout);
router.post("/checkout", _productCacheMiddleware["default"], _checkoutController.checkout);
router.post('/profile', _profileController.retrievePurchaseHistory);
var _default = router;
exports["default"] = _default;