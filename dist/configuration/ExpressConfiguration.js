"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfigureExpress = ConfigureExpress;

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _todolist = require("../todolist");

require("./MongooseConfiguration");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// @flow
// eslint-disable-next-line import/prefer-default-export
function ConfigureExpress() {
  var app = (0, _express["default"])();
  app.use((0, _cors["default"])());
  app.use(_express["default"].json());
  app.use(_express["default"].urlencoded({
    extended: true
  }));
  (0, _todolist.todoListRoute)(app);
  (0, _todolist.todoItemRoute)(app);
  return app;
}