"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _User = require("./User.controller");

var _default = function _default(app) {
  app.post('/user', _User.createUser);
  app.get('/user/:username', _User.getUser);
  app.put('/user/:username', _User.updateUser);
};

exports["default"] = _default;