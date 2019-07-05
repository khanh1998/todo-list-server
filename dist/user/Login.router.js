"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default = function _default(app, passport) {
  app.post('/login', function (req, res, next) {
    passport.authenticate('getJwtToken', {
      session: false
    },
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(error, user, info) {
        var _id, username, payload, jwtToken;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (error) {
                  res.status(500).json({
                    success: false,
                    message: error.message
                  });
                }

                if (!user) {
                  _context.next = 16;
                  break;
                }

                _id = user._id, username = user.username;
                payload = {
                  id: _id,
                  username: username
                };
                _context.prev = 4;
                _context.next = 7;
                return _jsonwebtoken["default"].sign(payload, process.env.SECRET);

              case 7:
                jwtToken = _context.sent;
                res.status(200).json({
                  jwtToken: jwtToken
                });
                _context.next = 14;
                break;

              case 11:
                _context.prev = 11;
                _context.t0 = _context["catch"](4);
                res.status(500).json({
                  success: false,
                  message: _context.t0.message
                });

              case 14:
                _context.next = 17;
                break;

              case 16:
                res.status(401).json({
                  success: false,
                  message: 'Unauthenticated!'
                });

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[4, 11]]);
      }));

      return function (_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      };
    }())(req, res, next);
  });
};

exports["default"] = _default;