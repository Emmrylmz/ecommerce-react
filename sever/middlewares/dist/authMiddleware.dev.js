"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = verifyToken;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

require("dotenv/config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function verifyToken(req, res, next) {
  var token = req.header('Authorization');
  if (!token) return res.status(401).json({
    error: 'Access denied'
  });

  try {
    var decoded = _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET_KEY);

    req.userId = decoded.userId;
    console.log("decoded");
    next();
  } catch (error) {
    res.status(401).json({
      error: 'Invalid token'
    });
  }
}

;