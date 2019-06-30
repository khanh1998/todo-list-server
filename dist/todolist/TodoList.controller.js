"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllTodoLists = getAllTodoLists;
exports.getTodoList = getTodoList;
exports.createTodoList = createTodoList;
exports.deleteTodoList = deleteTodoList;
exports.updateTodoList = updateTodoList;

var _loadModel = _interopRequireDefault(require("../configuration/loadModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var todoListModel = _loadModel["default"].TodoList;

function getAllTodoLists(_x, _x2) {
  return _getAllTodoLists.apply(this, arguments);
}

function _getAllTodoLists() {
  _getAllTodoLists = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var resultList;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return todoListModel.find({});

          case 3:
            resultList = _context.sent;

            if (resultList) {
              res.status(200).json(resultList);
            } else {
              res.status(400).json({
                success: false,
                message: 'There is no TodoList'
              });
            }

            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            res.status(500).json({
              success: false,
              message: _context.t0.message
            });

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));
  return _getAllTodoLists.apply(this, arguments);
}

function getTodoList(_x3, _x4) {
  return _getTodoList.apply(this, arguments);
}

function _getTodoList() {
  _getTodoList = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var todoListId, todoList;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            todoListId = req.params.todoListId;
            _context2.prev = 1;
            _context2.next = 4;
            return todoListModel.findOne({
              _id: todoListId
            });

          case 4:
            todoList = _context2.sent;

            if (todoList) {
              res.status(200).json(todoList);
            } else {
              res.status(400).json({
                success: false,
                message: "Todo list ".concat(todoListId, " is not existed")
              });
            }

            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](1);
            res.status(500).json({
              success: false,
              message: _context2.t0.message
            });

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 8]]);
  }));
  return _getTodoList.apply(this, arguments);
}

function createTodoList(_x5, _x6) {
  return _createTodoList.apply(this, arguments);
}

function _createTodoList() {
  _createTodoList = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(req, res) {
    var _req$body, list, owner, name, description, todoList, doc;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$body = req.body, list = _req$body.list, owner = _req$body.owner, name = _req$body.name, description = _req$body.description;
            list.forEach(function (todo) {
              var t = todo;
              t.expireDate = Date.parse(t.expireDate);
              t.remindTime = Date.parse(t.remindTime);
            });
            todoList = {
              list: list,
              owner: owner,
              name: name,
              description: description
            };
            _context3.prev = 3;
            _context3.next = 6;
            return todoListModel.create(todoList);

          case 6:
            doc = _context3.sent;
            if (doc) res.status(200).json(doc);else {
              res.status(400).json({
                success: false,
                message: 'Cannot create todo list'
              });
            }
            _context3.next = 13;
            break;

          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3["catch"](3);
            res.status(500).json({
              success: false,
              message: _context3.t0.message
            });

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[3, 10]]);
  }));
  return _createTodoList.apply(this, arguments);
}

function deleteTodoList(_x7, _x8) {
  return _deleteTodoList.apply(this, arguments);
}

function _deleteTodoList() {
  _deleteTodoList = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(req, res) {
    var todoListId, userId, doc, onwer;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            todoListId = req.params.todoListId;
            _context4.prev = 1;
            _context4.next = 4;
            return todoListModel.findOne({
              _id: todoListId
            });

          case 4:
            doc = _context4.sent;

            if (!doc) {
              _context4.next = 16;
              break;
            }

            _context4.next = 8;
            return doc.owners.id(userId);

          case 8:
            onwer = _context4.sent;
            _context4.next = 11;
            return doc.owners.pop(onwer);

          case 11:
            _context4.next = 13;
            return doc.save();

          case 13:
            res.status(200).json({
              success: true,
              message: 'Delete todo list successfully'
            });
            _context4.next = 17;
            break;

          case 16:
            res.status(400).json({
              success: false,
              message: 'This todo list is not existed'
            });

          case 17:
            _context4.next = 22;
            break;

          case 19:
            _context4.prev = 19;
            _context4.t0 = _context4["catch"](1);
            res.status(500).json({
              success: false,
              message: _context4.t0.message
            });

          case 22:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 19]]);
  }));
  return _deleteTodoList.apply(this, arguments);
}

function updateTodoList(_x9, _x10) {
  return _updateTodoList.apply(this, arguments);
}

function _updateTodoList() {
  _updateTodoList = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(req, res) {
    var todoListId, _req$body2, list, owners, name, description, doc, updated;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            // let doc = await todoListModel.
            // updateOne({ _id: todoList._id, owners: [{ userId: userId }] }, todoList);
            todoListId = req.params.todoListId;
            _req$body2 = req.body, list = _req$body2.list, owners = _req$body2.owners, name = _req$body2.name, description = _req$body2.description;
            _context5.prev = 2;
            _context5.next = 5;
            return todoListModel.findOne({
              _id: todoListId
            });

          case 5:
            doc = _context5.sent;

            if (!doc) {
              _context5.next = 17;
              break;
            }

            doc.list = list;
            doc.owners = owners;
            doc.name = name;
            doc.description = description;
            _context5.next = 13;
            return doc.save();

          case 13:
            updated = _context5.sent;
            res.status(200).json(updated);
            _context5.next = 18;
            break;

          case 17:
            res.status(400).json({
              success: false,
              message: 'Cannot update todo list'
            });

          case 18:
            _context5.next = 23;
            break;

          case 20:
            _context5.prev = 20;
            _context5.t0 = _context5["catch"](2);
            res.status(500).json({
              success: false,
              message: _context5.t0.message
            });

          case 23:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[2, 20]]);
  }));
  return _updateTodoList.apply(this, arguments);
}