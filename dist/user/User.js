"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var User = new _mongoose["default"].Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    validate: function validate(username) {
      var re = /^[a-zA-Z0-9]+$/;
      return re.test(username);
    }
  },
  avatar: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: function validate(email) {
      var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/;
      return re.test(String(email).toLowerCase());
    }
  },
  todoLists: {
    type: [_mongoose["default"].SchemaTypes.ObjectId],
    ref: 'TodoList'
  }
}); // eslint-disable-next-line func-names

User.pre('save', function (next) {
  var user = this;

  if (this.isModified('password') || this.isNew) {
    _bcrypt["default"].genSalt(10, function (saltError, salt) {
      if (saltError) return next(saltError);

      _bcrypt["default"].hash(user.password, salt, function (hashError, hash) {
        if (hashError) return next(hashError);
        user.password = hash;
        next();
      });
    });
  } else return next();
});

User.methods.comparePassword =
/*#__PURE__*/
function () {
  var _compare = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(password) {
    var user, matches;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            user = this;
            _context.next = 4;
            return _bcrypt["default"].compare(password, user.password);

          case 4:
            matches = _context.sent;

            if (!matches) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", true);

          case 7:
            return _context.abrupt("return", false);

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);

          case 13:
            return _context.abrupt("return", false);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 10]]);
  }));

  function compare(_x) {
    return _compare.apply(this, arguments);
  }

  return compare;
}();

var _default = _mongoose["default"].model('User', User);

exports["default"] = _default;