"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.purchaseItemSchema = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var purchaseItemSchema = new _mongoose["default"].Schema({
  id: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  datePurchased: {
    type: Date,
    "default": Date.now
  },
  totalAmount: {
    type: Number,
    required: true
  }
});
exports.purchaseItemSchema = purchaseItemSchema;

var User = _mongoose["default"].model('User', new _mongoose["default"].Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  purchaseHistory: [{
    type: purchaseItemSchema
  }]
}));

var _default = User;
exports["default"] = _default;