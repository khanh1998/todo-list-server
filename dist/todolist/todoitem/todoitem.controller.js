"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTodoItem = createTodoItem;
exports.getTodoItem = getTodoItem;
exports.getAllTodoItem = getAllTodoItem;
exports.deleleTodoItem = deleleTodoItem;
exports.updateTodoItem = updateTodoItem;

var _loadModel = _interopRequireDefault(require("../../configuration/loadModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var todoListModel = _loadModel["default"].TodoList; // @flow

function createTodoItem(_x, _x2) {
  return _createTodoItem.apply(this, arguments);
}

function _createTodoItem() {
  _createTodoItem = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var todoListId, _req$body, title, subTodo, description, note, expireDate, remindTime, completed, todoItem, doc, created;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            todoListId = req.params.todoListId;
            _req$body = req.body, title = _req$body.title, subTodo = _req$body.subTodo, description = _req$body.description, note = _req$body.note, expireDate = _req$body.expireDate, remindTime = _req$body.remindTime;
            expireDate = Date.parse(expireDate);
            remindTime = Date.parse(remindTime);
            completed = false;
            todoItem = {
              title: title,
              subTodo: subTodo,
              description: description,
              note: note,
              expireDate: expireDate,
              remindTime: remindTime,
              completed: completed
            };
            _context.prev = 6;
            _context.next = 9;
            return todoListModel.findOne({
              _id: todoListId
            });

          case 9:
            doc = _context.sent;

            if (!doc) {
              _context.next = 19;
              break;
            }

            _context.next = 13;
            return doc.list.push(todoItem);

          case 13:
            _context.next = 15;
            return doc.save();

          case 15:
            created = _context.sent;
            res.status(200).json(created.list[created.list.length - 1]);
            _context.next = 20;
            break;

          case 19:
            res.status(400).json({
              success: false,
              message: "Todo list ".concat(todoListId, " is not existed")
            });

          case 20:
            _context.next = 25;
            break;

          case 22:
            _context.prev = 22;
            _context.t0 = _context["catch"](6);
            res.status(500).json({
              success: false,
              message: _context.t0.message
            });

          case 25:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[6, 22]]);
  }));
  return _createTodoItem.apply(this, arguments);
}

function getTodoItem(_x3, _x4) {
  return _getTodoItem.apply(this, arguments);
}

function _getTodoItem() {
  _getTodoItem = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var todoListId, todoItemId, doc, todoItem;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            todoListId = req.params.todoListId;
            todoItemId = req.params.todoItemId;
            _context2.prev = 2;
            _context2.next = 5;
            return todoListModel.findOne({
              _id: todoListId
            });

          case 5:
            doc = _context2.sent;

            if (!doc) {
              _context2.next = 13;
              break;
            }

            _context2.next = 9;
            return doc.list.id(todoItemId);

          case 9:
            todoItem = _context2.sent;

            if (todoItem) {
              res.status(200).json(todoItem);
            } else {
              res.status(400).json({
                success: false,
                message: "Todo item ".concat(todoItemId, " is not existed")
              });
            }

            _context2.next = 14;
            break;

          case 13:
            res.status(400).json({
              success: false,
              message: "Todo list ".concat(todoListId, " is not existed")
            });

          case 14:
            _context2.next = 19;
            break;

          case 16:
            _context2.prev = 16;
            _context2.t0 = _context2["catch"](2);
            res.status(500).json({
              success: false,
              message: _context2.t0.message
            });

          case 19:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 16]]);
  }));
  return _getTodoItem.apply(this, arguments);
}

function getAllTodoItem(_x5, _x6) {
  return _getAllTodoItem.apply(this, arguments);
}

function _getAllTodoItem() {
  _getAllTodoItem = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(req, res) {
    var todoListId, doc;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            todoListId = req.params.todoListId;
            _context3.prev = 1;
            _context3.next = 4;
            return todoListModel.findOne({
              _id: todoListId
            });

          case 4:
            doc = _context3.sent;

            if (doc) {
              res.status(200).json(doc.list);
            } else {
              res.status(400).json({
                success: false,
                message: "Todo list ".concat(todoListId, " is not existed")
              });
            }

            _context3.next = 11;
            break;

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](1);
            res.status(500).json({
              success: false,
              message: _context3.t0.message
            });

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 8]]);
  }));
  return _getAllTodoItem.apply(this, arguments);
}

function deleleTodoItem(_x7, _x8) {
  return _deleleTodoItem.apply(this, arguments);
}

function _deleleTodoItem() {
  _deleleTodoItem = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(req, res) {
    var todoListId, todoItemId, doc, todoItem;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            todoListId = req.params.todoListId;
            todoItemId = req.params.todoItemId;
            _context4.prev = 2;
            _context4.next = 5;
            return todoListModel.findOne({
              _id: todoListId
            });

          case 5:
            doc = _context4.sent;

            if (!doc) {
              _context4.next = 19;
              break;
            }

            todoItem = doc.list.id(todoItemId);

            if (!todoItem) {
              _context4.next = 16;
              break;
            }

            _context4.next = 11;
            return doc.list.pop(todoItem);

          case 11:
            _context4.next = 13;
            return doc.save();

          case 13:
            res.status(200).json(todoItem);
            _context4.next = 17;
            break;

          case 16:
            res.status(400).json({
              success: false,
              message: "Todo item ".concat(todoItemId, " is not existed")
            });

          case 17:
            _context4.next = 20;
            break;

          case 19:
            res.status(400).json({
              success: false,
              message: "Todo list ".concat(todoListId, " is not existed")
            });

          case 20:
            _context4.next = 25;
            break;

          case 22:
            _context4.prev = 22;
            _context4.t0 = _context4["catch"](2);
            res.status(500).json({
              success: false,
              message: _context4.t0.message
            });

          case 25:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[2, 22]]);
  }));
  return _deleleTodoItem.apply(this, arguments);
}

function updateTodoItem(_x9, _x10) {
  return _updateTodoItem.apply(this, arguments);
}

function _updateTodoItem() {
  _updateTodoItem = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(req, res) {
    var todoListId, todoItemId, _req$body2, title, subTodo, description, note, expireDate, remindTime, completed, doc, todoItem, updated;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            todoListId = req.params.todoListId;
            todoItemId = req.params.todoItemId;
            _req$body2 = req.body, title = _req$body2.title, subTodo = _req$body2.subTodo, description = _req$body2.description, note = _req$body2.note, expireDate = _req$body2.expireDate, remindTime = _req$body2.remindTime, completed = _req$body2.completed;
            _context5.prev = 3;
            _context5.next = 6;
            return todoListModel.findOne({
              _id: todoListId
            });

          case 6:
            doc = _context5.sent;

            if (!doc) {
              _context5.next = 28;
              break;
            }

            _context5.next = 10;
            return doc.list.id(todoItemId);

          case 10:
            todoItem = _context5.sent;

            if (!todoItem) {
              _context5.next = 25;
              break;
            }

            todoItem.title = title;
            todoItem.subTodo = subTodo;
            todoItem.description = description;
            todoItem.note = note;
            todoItem.expireDate = expireDate;
            todoItem.remindTime = remindTime;
            todoItem.completed = completed;
            _context5.next = 21;
            return doc.save();

          case 21:
            updated = _context5.sent;
            res.status(200).json(updated.list[updated.list.length - 1]);
            _context5.next = 26;
            break;

          case 25:
            res.status(400).json({
              success: false,
              message: "Todo item ".concat(todoItemId, " is not existed")
            });

          case 26:
            _context5.next = 29;
            break;

          case 28:
            res.status(400).json({
              success: false,
              message: "Todo list ".concat(todoListId, " is not existed")
            });

          case 29:
            _context5.next = 34;
            break;

          case 31:
            _context5.prev = 31;
            _context5.t0 = _context5["catch"](3);
            res.status(500).json({
              success: false,
              message: _context5.t0.message
            });

          case 34:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[3, 31]]);
  }));
  return _updateTodoItem.apply(this, arguments);
}