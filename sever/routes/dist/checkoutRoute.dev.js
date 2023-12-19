"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _checkoutController = require("../controllers/checkoutController.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var checkoutRouter = _express["default"].Router();

router.post("/checkout", _checkoutController.checkout);
var _default = checkoutRouter;
exports["default"] = _default;