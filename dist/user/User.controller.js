"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createUser = createUser;
exports.getUser = getUser;
exports.updateUser = updateUser;

var _loadModel = _interopRequireDefault(require("../configuration/loadModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var UserModel = _loadModel["default"].User;

function createUser(_x, _x2) {
  return _createUser.apply(this, arguments);
}

function _createUser() {
  _createUser = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, username, password, avatar, email, user, isExistedUsername, newUser, created;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _req$body = req.body, username = _req$body.username, password = _req$body.password, avatar = _req$body.avatar, email = _req$body.email;
            user = {
              username: username,
              password: password,
              avatar: avatar,
              email: email
            };
            _context.next = 5;
            return UserModel.findOne({
              username: username
            });

          case 5:
            isExistedUsername = _context.sent;

            if (isExistedUsername) {
              _context.next = 14;
              break;
            }

            newUser = new UserModel(user);
            _context.next = 10;
            return newUser.save();

          case 10:
            created = _context.sent;

            if (created) {
              res.status(200).json(created);
            } else {
              res.status(400).json({
                success: false,
                message: 'Cannot create user, check your parameter'
              });
            }

            _context.next = 15;
            break;

          case 14:
            res.status(400).json({
              success: false,
              message: "Username ".concat(username, " is taken already, please choose another username")
            });

          case 15:
            _context.next = 20;
            break;

          case 17:
            _context.prev = 17;
            _context.t0 = _context["catch"](0);
            res.status(500).json({
              success: false,
              message: _context.t0.message
            });

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 17]]);
  }));
  return _createUser.apply(this, arguments);
}

function getUser(_x3, _x4) {
  return _getUser.apply(this, arguments);
}

function _getUser() {
  _getUser = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var username, user;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            username = req.params.username;
            _context2.next = 4;
            return UserModel.findOne({
              username: username
            });

          case 4:
            user = _context2.sent;

            if (user) {
              res.status(200).json(user);
            } else {
              res.status(400).json({
                success: false,
                message: "User ".concat(username, " is not existed!")
              });
            }

            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](0);
            res.status(500).json({
              success: false,
              message: _context2.t0.message
            });

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 8]]);
  }));
  return _getUser.apply(this, arguments);
}

function updateUser(_x5, _x6) {
  return _updateUser.apply(this, arguments);
}

function _updateUser() {
  _updateUser = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(req, res) {
    var username, _req$body2, password, avatar, email, user, updated;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            username = req.params.username;
            _req$body2 = req.body, password = _req$body2.password, avatar = _req$body2.avatar, email = _req$body2.email;
            _context3.next = 5;
            return UserModel.findOne({
              username: username
            });

          case 5:
            user = _context3.sent;

            if (!user) {
              _context3.next = 16;
              break;
            }

            user.password = password;
            user.avatar = avatar;
            user.email = email;
            _context3.next = 12;
            return user.save();

          case 12:
            updated = _context3.sent;
            res.status(200).json(updated);
            _context3.next = 17;
            break;

          case 16:
            res.status(400).json({
              success: false,
              message: 'Cannot update user information'
            });

          case 17:
            _context3.next = 22;
            break;

          case 19:
            _context3.prev = 19;
            _context3.t0 = _context3["catch"](0);
            res.status(500).json({
              success: false,
              message: _context3.t0.message
            });

          case 22:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 19]]);
  }));
  return _updateUser.apply(this, arguments);
}