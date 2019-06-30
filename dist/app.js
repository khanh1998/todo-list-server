"use strict";

require("@babel/polyfill");

var _http = _interopRequireDefault(require("http"));

var _ExpressConfiguration = require("./configuration/ExpressConfiguration");

var _constant = _interopRequireDefault(require("./configuration/constant"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _ExpressConfiguration.ConfigureExpress)();

var server = _http["default"].createServer(app);

server.listen(_constant["default"].PORT, function () {
  return console.log("Server is running or port ".concat(_constant["default"].PORT));
});