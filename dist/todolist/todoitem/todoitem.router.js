"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.todoItemRoute = todoItemRoute;

var _todoitem = require("./todoitem.controller");

// eslint-disable-next-line import/prefer-default-export
function todoItemRoute(app, passport) {
  app.get('/todolist/:todoListId/todoitem/:todoItemId', passport.authenticate('jwt'), _todoitem.getTodoItem);
  app.get('/todolist/:todoListId/todoitems', passport.authenticate('jwt'), _todoitem.getAllTodoItem);
  app.post('/todolist/:todoListId/todoitem', passport.authenticate('jwt'), _todoitem.createTodoItem);
  app["delete"]('/todolist/:todoListId/todoitem/:todoItemId', passport.authenticate('jwt'), _todoitem.deleleTodoItem);
  app.put('/todolist/:todoListId/todoitem/:todoItemId', passport.authenticate('jwt'), _todoitem.updateTodoItem);
}