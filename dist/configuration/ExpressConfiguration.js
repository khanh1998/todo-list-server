"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfigureExpress = ConfigureExpress;

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _morgan = _interopRequireDefault(require("morgan"));

var _connectFlash = _interopRequireDefault(require("connect-flash"));

var _PassportConfiguration = _interopRequireDefault(require("./PassportConfiguration"));

var _todolist = require("../todolist");

var _user = require("../user");

require("./MongooseConfiguration");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// eslint-disable-next-line import/prefer-default-export
function ConfigureExpress() {
  var app = (0, _express["default"])();
  app.use((0, _connectFlash["default"])());
  app.use((0, _morgan["default"])('dev'));
  app.use((0, _cors["default"])());
  app.use(_express["default"].json());
  app.use(_express["default"].urlencoded({
    extended: true
  }));
  var passport = (0, _PassportConfiguration["default"])();
  app.use(passport.initialize());
  (0, _user.loginRoute)(app, passport);
  (0, _user.userRoute)(app);
  (0, _todolist.todoListRoute)(app, passport);
  (0, _todolist.todoItemRoute)(app, passport);
  return app;
}