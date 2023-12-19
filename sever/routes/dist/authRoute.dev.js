"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _AuthController = require("../controllers/AuthController.js");

var _checkoutController = require("../controllers/checkoutController.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post("/signup", _AuthController.signup);
router.post("/login", _AuthController.login);
router.get("/logout", _AuthController.logout);
router.post("/checkout", _checkoutController.checkout);
var _default = router;
exports["default"] = _default;