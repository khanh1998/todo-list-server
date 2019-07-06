"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.todoItemRoute = todoItemRoute;

var _todoitem = require("./todoitem.controller");

// eslint-disable-next-line import/prefer-default-export
function todoItemRoute(app, passport) {
  var authenticate = function authenticate(req, res, next) {
    passport.authenticate('jwt', {
      session: false
    }, function (err, user, info) {
      if (err) next(err);

      if (user) {
        req.user = user;
        next();
      } else {
        res.status(401).json({
          success: false,
          message: info.message
        });
      }
    })(req, res, next);
  };

  app.get('/todolist/:todoListId/todoitem/:todoItemId', authenticate, _todoitem.getTodoItem);
  app.get('/todolist/:todoListId/todoitems', authenticate, _todoitem.getAllTodoItem);
  app.post('/todolist/:todoListId/todoitem', authenticate, _todoitem.createTodoItem);
  app["delete"]('/todolist/:todoListId/todoitem/:todoItemId', authenticate, _todoitem.deleleTodoItem);
  app.put('/todolist/:todoListId/todoitem/:todoItemId', authenticate, _todoitem.updateTodoItem);
}