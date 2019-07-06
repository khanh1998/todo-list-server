"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _passport = _interopRequireDefault(require("passport"));

var _passportJwt = require("passport-jwt");

var _passportLocal = require("passport-local");

var _loadModel = _interopRequireDefault(require("./loadModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var options = {
  secretOrKey: process.env.SECRET,
  jwtFromRequest: _passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken()
};
var UserModel = _loadModel["default"].User;

function _default() {
  _passport["default"].use('jwt', new _passportJwt.Strategy(options,
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(jwtPayload, done) {
      var user;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return UserModel.findById(jwtPayload.id);

            case 3:
              user = _context.sent;

              if (!user) {
                _context.next = 8;
                break;
              }

              return _context.abrupt("return", done(null, user));

            case 8:
              return _context.abrupt("return", done(null, false));

            case 9:
              _context.next = 15;
              break;

            case 11:
              _context.prev = 11;
              _context.t0 = _context["catch"](0);
              // eslint-disable-next-line no-console
              console.log(_context.t0);
              return _context.abrupt("return", done(_context.t0, false));

            case 15:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 11]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }()));

  var optionsLocal = {
    usernameField: 'username',
    passwordField: 'password'
  };

  _passport["default"].use('getJwtToken', new _passportLocal.Strategy(optionsLocal,
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(username, password, done) {
      var user, matchPassword;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return UserModel.findOne({
                username: username
              });

            case 3:
              user = _context2.sent;

              if (!user) {
                _context2.next = 12;
                break;
              }

              _context2.next = 7;
              return user.comparePassword(password);

            case 7:
              matchPassword = _context2.sent;

              if (!matchPassword) {
                _context2.next = 10;
                break;
              }

              return _context2.abrupt("return", done(null, user));

            case 10:
              _context2.next = 13;
              break;

            case 12:
              return _context2.abrupt("return", done(null, false, {
                success: false,
                message: 'Unregisterd user'
              }));

            case 13:
              _context2.next = 18;
              break;

            case 15:
              _context2.prev = 15;
              _context2.t0 = _context2["catch"](0);
              return _context2.abrupt("return", done(_context2.t0, false));

            case 18:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 15]]);
    }));

    return function (_x3, _x4, _x5) {
      return _ref2.apply(this, arguments);
    };
  }()));

  return _passport["default"];
}