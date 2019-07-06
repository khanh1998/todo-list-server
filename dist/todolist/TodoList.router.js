"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.todoListRoute = void 0;

var _TodoList = require("./TodoList.controller");

// eslint-disable-next-line import/prefer-default-export
var todoListRoute = function todoListRoute(app, passport) {
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

  app.get('/todolists', authenticate, _TodoList.getAllTodoLists);
  app.get('/todolist/:todoListId', authenticate, _TodoList.getTodoList);
  app.post('/todolist', authenticate, _TodoList.createTodoList);
  app.put('/todolist/:todoListId', authenticate, _TodoList.updateTodoList);
  app["delete"]('/todolist/:todoListId', authenticate, _TodoList.deleteTodoList);
};

exports.todoListRoute = todoListRoute;