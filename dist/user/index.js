"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "userRoute", {
  enumerable: true,
  get: function get() {
    return _User["default"];
  }
});
Object.defineProperty(exports, "loginRoute", {
  enumerable: true,
  get: function get() {
    return _Login["default"];
  }
});

var _User = _interopRequireDefault(require("./User.router"));

var _Login = _interopRequireDefault(require("./Login.router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }