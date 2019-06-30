"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _User = _interopRequireDefault(require("../user/User"));

var _TodoList = _interopRequireDefault(require("../todolist/TodoList"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var modelInstances = {
  User: _User["default"],
  TodoList: _TodoList["default"]
};
var _default = modelInstances;
exports["default"] = _default;