"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.purchaseItemSchema = exports.cartItemSchema = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var cartItemSchema = new _mongoose["default"].Schema({
  id: {
    type: Number,
    required: true
  },
  // Use ObjectId
  quantity: {
    type: Number,
    required: true
  }
});
exports.cartItemSchema = cartItemSchema;
var purchaseItemSchema = new _mongoose["default"].Schema({
  items: {
    type: [cartItemSchema]
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
  id: {
    type: _mongoose["default"].Schema.Types.ObjectId
  },
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