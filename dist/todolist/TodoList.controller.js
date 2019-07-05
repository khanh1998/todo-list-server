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
    var id, resultList, list;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            // after is processed by Passport authenticate
            // request object will be added more field
            // user is one of them, there are still more fields of Passport
            // user contain all information of the login user
            id = req.user.id;
            _context.next = 4;
            return todoListModel.find({});

          case 4:
            resultList = _context.sent;

            if (resultList) {
              // check whether the id of user is added to owners list or not
              // if not auto add user id to owners list
              list = resultList.filter(function (todo) {
                return todo.owners.find(function (owner) {
                  return owner.userId.valueOf() === id;
                });
              });

              if (!list) {
                res.status(401).json({
                  success: false,
                  message: 'You don\'t have any todo list'
                });
              } else {
                res.status(200).json(list);
              }
            } else {
              res.status(400).json({
                success: false,
                message: 'There is no TodoList'
              });
            }

            _context.next = 11;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            res.status(500).json({
              success: false,
              message: _context.t0.message
            });

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 8]]);
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
    var todoListId, id, todoList, isOwner;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            todoListId = req.params.todoListId; // after is processed by Passport authenticate
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
            todoList = _context2.sent;

            if (todoList) {
              // check whether the id of user is added to owners list or not
              // if not auto add user id to owners list
              // owner.userId is objectId type of Mongoose
              // id is String type
              // so cannot use === opearator to compare
              isOwner = todoList.owners.find(function (owner) {
                return owner.userId.valueOf() === id;
              });

              if (!isOwner) {
                res.status(400).json({
                  success: false,
                  message: "Todo list ".concat(todoListId, " is not belong to you")
                });
              } else {
                res.status(200).json(todoList);
              }
            } else {
              res.status(400).json({
                success: false,
                message: "Todo list ".concat(todoListId, " is not existed")
              });
            }

            _context2.next = 12;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](2);
            res.status(500).json({
              success: false,
              message: _context2.t0.message
            });

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 9]]);
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
    var id, _req$body, list, owners, name, description, hasAddId, todoList, doc;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            // after is processed by Passport authenticate
            // request object will be added more field
            // user is one of them, there are still more fields of Passport
            // user contain all information of the login user
            id = req.user.id;
            _req$body = req.body, list = _req$body.list, owners = _req$body.owners, name = _req$body.name, description = _req$body.description; // the expireDate and remindTime are String type when the server receive it
            // we need to parse these field to Date type

            list.forEach(function (todo) {
              var t = todo;
              t.expireDate = Date.parse(t.expireDate);
              t.remindTime = Date.parse(t.remindTime);
            }); // check whether the id of user is added to owners list or not
            // if not auto add user id to owners list

            hasAddId = owners.find(function (owner) {
              return owner.userId.valueOf() === id;
            });
            if (!hasAddId) owners.push({
              userId: id
            });
            todoList = {
              list: list,
              owners: owners,
              name: name,
              description: description
            };
            _context3.prev = 6;
            _context3.next = 9;
            return todoListModel.create(todoList);

          case 9:
            doc = _context3.sent;

            if (doc) {
              res.status(200).json(doc);
            } else {
              res.status(400).json({
                success: false,
                message: 'Cannot create todo list'
              });
            }

            _context3.next = 16;
            break;

          case 13:
            _context3.prev = 13;
            _context3.t0 = _context3["catch"](6);
            res.status(500).json({
              success: false,
              message: _context3.t0.message
            });

          case 16:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[6, 13]]);
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
    var todoListId, id, doc, isBelongToUser, onwer, message;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            todoListId = req.params.todoListId; // after is processed by Passport authenticate
            // request object will be added more field
            // user is one of them, there are still more fields of Passport
            // user contain all information of the login user

            id = req.user.id;
            _context4.prev = 2;
            _context4.next = 5;
            return todoListModel.findOne({
              _id: todoListId
            });

          case 5:
            doc = _context4.sent;
            // check whether the to-do list belong to the user or not
            // by check if the owners array has the user id or not
            isBelongToUser = doc.owners.find(function (owner) {
              return owner.userId.valueOf() === id;
            });

            if (!(doc && isBelongToUser)) {
              _context4.next = 18;
              break;
            }

            _context4.next = 10;
            return doc.owners.id(id);

          case 10:
            onwer = _context4.sent;
            _context4.next = 13;
            return doc.owners.pop(onwer);

          case 13:
            _context4.next = 15;
            return doc.save();

          case 15:
            res.status(200).json({
              success: true,
              message: 'Delete todo list successfully'
            });
            _context4.next = 20;
            break;

          case 18:
            if (!isBelongToUser) {
              message = 'This to-do list is not belong to you';
            } else {
              message = 'This todo list is not existed';
            }

            res.status(400).json({
              success: false,
              message: message
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
  return _deleteTodoList.apply(this, arguments);
}

function updateTodoList(_x9, _x10) {
  return _updateTodoList.apply(this, arguments);
}

function _updateTodoList() {
  _updateTodoList = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(req, res) {
    var id, todoListId, _req$body2, list, owners, name, description, doc, isBelongToUserBeforeUpdate, updated, isBelongToUserAfterUpdate, message;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            // after is processed by Passport authenticate
            // request object will be added more field
            // user is one of them, there are still more fields of Passport
            // user contain all information of the login user
            id = req.user.id;
            todoListId = req.params.todoListId;
            _req$body2 = req.body, list = _req$body2.list, owners = _req$body2.owners, name = _req$body2.name, description = _req$body2.description;
            _context5.prev = 3;
            _context5.next = 6;
            return todoListModel.findOne({
              _id: todoListId
            });

          case 6:
            doc = _context5.sent;
            // check whether the to-do list is belong to the user or not
            // checking by examine the owners field of the document get from database
            // if the to-do list is belong to the user, he can edit the owners list
            // include delete him from the list
            isBelongToUserBeforeUpdate = doc.owners.find(function (owner) {
              return owner.userId.valueOf() === id;
            });

            if (!(doc && isBelongToUserBeforeUpdate)) {
              _context5.next = 20;
              break;
            }

            doc.list = list;
            doc.owners = owners;
            doc.name = name;
            doc.description = description;
            _context5.next = 15;
            return doc.save();

          case 15:
            updated = _context5.sent;
            // check whether the user had remove himself from the list or not
            // if yes, he cannot receive the updated list any more
            isBelongToUserAfterUpdate = updated.owners.find(function (owner) {
              return owner.userId.valueOf() === id;
            });

            if (isBelongToUserAfterUpdate) {
              res.status(200).json(updated);
            } else {
              res.status(200).json({
                success: true,
                message: 'Update successfully, You now cannot access to the to-do list any more'
              });
            }

            _context5.next = 22;
            break;

          case 20:
            if (!isBelongToUserBeforeUpdate) {
              message = 'This to-do list is not belong to you';
            } else {
              message = 'Your parameter is wrong';
            }

            res.status(400).json({
              success: false,
              message: message
            });

          case 22:
            _context5.next = 27;
            break;

          case 24:
            _context5.prev = 24;
            _context5.t0 = _context5["catch"](3);
            res.status(500).json({
              success: false,
              message: _context5.t0.message
            });

          case 27:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[3, 24]]);
  }));
  return _updateTodoList.apply(this, arguments);
}