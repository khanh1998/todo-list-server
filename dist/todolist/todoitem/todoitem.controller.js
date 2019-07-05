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

var todoListModel = _loadModel["default"].TodoList;

function createTodoItem(_x, _x2) {
  return _createTodoItem.apply(this, arguments);
}

function _createTodoItem() {
  _createTodoItem = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var todoListId, _req$body, title, subTodo, description, note, _req$body2, expireDate, remindTime, completed, todoItem, id, doc, isBelongToUser, created, message;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            todoListId = req.params.todoListId;
            _req$body = req.body, title = _req$body.title, subTodo = _req$body.subTodo, description = _req$body.description, note = _req$body.note;
            _req$body2 = req.body, expireDate = _req$body2.expireDate, remindTime = _req$body2.remindTime;
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
            }; // after is processed by Passport authenticate
            // request object will be added more field
            // user is one of them, there are still more fields of Passport
            // user contain all information of the login user

            id = req.user.id;
            _context.prev = 8;
            _context.next = 11;
            return todoListModel.findOne({
              _id: todoListId
            });

          case 11:
            doc = _context.sent;
            // check whether the to-do list is belong to the user or not
            // owner.userId is objectId type of Mongoose
            // id is String type
            // so cannot use === opearator to compare
            isBelongToUser = doc.owners.find(function (owner) {
              return owner.userId == id;
            });

            if (!(doc && isBelongToUser)) {
              _context.next = 22;
              break;
            }

            _context.next = 16;
            return doc.list.push(todoItem);

          case 16:
            _context.next = 18;
            return doc.save();

          case 18:
            created = _context.sent;
            res.status(200).json(created.list[created.list.length - 1]);
            _context.next = 25;
            break;

          case 22:
            message = "Todo list ".concat(todoListId, " is not existed");

            if (!isBelongToUser) {
              message = 'This to-do list is not belong to you';
            }

            res.status(400).json({
              success: false,
              message: message
            });

          case 25:
            _context.next = 30;
            break;

          case 27:
            _context.prev = 27;
            _context.t0 = _context["catch"](8);
            res.status(500).json({
              success: false,
              message: _context.t0.message
            });

          case 30:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[8, 27]]);
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
    var _req$params, todoListId, todoItemId, id, doc, isBelongToUser, todoItem, message;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$params = req.params, todoListId = _req$params.todoListId, todoItemId = _req$params.todoItemId; // after is processed by Passport authenticate
            // request object will be added more field
            // user is one of them, there are still more fields of Passport
            // user contain all information of the login user

            id = req.user.id;
            _context2.prev = 2;
            _context2.next = 5;
            return todoListModel.findOne({
              _id: todoListId
            });

          case 5:
            doc = _context2.sent;
            // check whether the to-do list is belong to the user or not
            isBelongToUser = doc.owners.find(function (owner) {
              return owner.userId.valueOf() === id;
            });

            if (!(doc && isBelongToUser)) {
              _context2.next = 14;
              break;
            }

            _context2.next = 10;
            return doc.list.id(todoItemId);

          case 10:
            todoItem = _context2.sent;

            if (todoItem) {
              res.status(200).json(todoItem);
            } else {
              res.status(400).json({
                success: false,
                message: "Todo item ".concat(todoItemId, " is not existed")
              });
            }

            _context2.next = 17;
            break;

          case 14:
            message = "Todo list ".concat(todoListId, " is not existed");

            if (!isBelongToUser) {
              message = 'This to-do list is not belong to you';
            }

            res.status(400).json({
              success: false,
              message: message
            });

          case 17:
            _context2.next = 22;
            break;

          case 19:
            _context2.prev = 19;
            _context2.t0 = _context2["catch"](2);
            res.status(500).json({
              success: false,
              message: _context2.t0.message
            });

          case 22:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 19]]);
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
    var _req$params2, todoListId, todoItemId, doc, todoItem;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _req$params2 = req.params, todoListId = _req$params2.todoListId, todoItemId = _req$params2.todoItemId;
            _context4.prev = 1;
            _context4.next = 4;
            return todoListModel.findOne({
              _id: todoListId
            });

          case 4:
            doc = _context4.sent;

            if (!doc) {
              _context4.next = 18;
              break;
            }

            todoItem = doc.list.id(todoItemId);

            if (!todoItem) {
              _context4.next = 15;
              break;
            }

            _context4.next = 10;
            return doc.list.pop(todoItem);

          case 10:
            _context4.next = 12;
            return doc.save();

          case 12:
            res.status(200).json(todoItem);
            _context4.next = 16;
            break;

          case 15:
            res.status(400).json({
              success: false,
              message: "Todo item ".concat(todoItemId, " is not existed")
            });

          case 16:
            _context4.next = 19;
            break;

          case 18:
            res.status(400).json({
              success: false,
              message: "Todo list ".concat(todoListId, " is not existed")
            });

          case 19:
            _context4.next = 24;
            break;

          case 21:
            _context4.prev = 21;
            _context4.t0 = _context4["catch"](1);
            res.status(500).json({
              success: false,
              message: _context4.t0.message
            });

          case 24:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 21]]);
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
    var _req$params3, todoListId, todoItemId, _req$body3, title, subTodo, description, note, expireDate, remindTime, completed, doc, todoItem, updated;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _req$params3 = req.params, todoListId = _req$params3.todoListId, todoItemId = _req$params3.todoItemId;
            _req$body3 = req.body, title = _req$body3.title, subTodo = _req$body3.subTodo, description = _req$body3.description, note = _req$body3.note, expireDate = _req$body3.expireDate, remindTime = _req$body3.remindTime, completed = _req$body3.completed;
            _context5.prev = 2;
            _context5.next = 5;
            return todoListModel.findOne({
              _id: todoListId
            });

          case 5:
            doc = _context5.sent;

            if (!doc) {
              _context5.next = 27;
              break;
            }

            _context5.next = 9;
            return doc.list.id(todoItemId);

          case 9:
            todoItem = _context5.sent;

            if (!todoItem) {
              _context5.next = 24;
              break;
            }

            todoItem.title = title;
            todoItem.subTodo = subTodo;
            todoItem.description = description;
            todoItem.note = note;
            todoItem.expireDate = expireDate;
            todoItem.remindTime = remindTime;
            todoItem.completed = completed;
            _context5.next = 20;
            return doc.save();

          case 20:
            updated = _context5.sent;
            res.status(200).json(updated.list[updated.list.length - 1]);
            _context5.next = 25;
            break;

          case 24:
            res.status(400).json({
              success: false,
              message: "Todo item ".concat(todoItemId, " is not existed")
            });

          case 25:
            _context5.next = 28;
            break;

          case 27:
            res.status(400).json({
              success: false,
              message: "Todo list ".concat(todoListId, " is not existed")
            });

          case 28:
            _context5.next = 33;
            break;

          case 30:
            _context5.prev = 30;
            _context5.t0 = _context5["catch"](2);
            res.status(500).json({
              success: false,
              message: _context5.t0.message
            });

          case 33:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[2, 30]]);
  }));
  return _updateTodoItem.apply(this, arguments);
}