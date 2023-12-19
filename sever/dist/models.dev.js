"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var ObjectId = _mongoose["default"].Types.ObjectId;
var UserSchema = new Schema({
  id: Number,
  name: String,
  email: String,
  history: [{
    productId: Number,
    piece: Number
  }]
});