"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _constant = _interopRequireDefault(require("./constant"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var options = {
  useNewUrlParser: true,
  useCreateIndex: true
};

try {
  _mongoose["default"].connect(_constant["default"].MONGO_URL, options);
} catch (error) {
  _mongoose["default"].createConnection(_constant["default"].MONGO_URL, options);
}

var connection = _mongoose["default"].connection;
connection.on('error', function () {
  return console.log('Database Connection error');
});
connection.on('connected', function () {
  return console.log('Database Connnection successfully');
});
connection.on('disconnected', function () {
  return console.log('Database disconnected');
});
connection.on('SIGINT', function () {
  return console.log('Connnection terminated');
});