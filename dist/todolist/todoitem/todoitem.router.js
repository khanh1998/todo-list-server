"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.todoItemRoute = todoItemRoute;

var _todoitem = require("./todoitem.controller");

// eslint-disable-next-line import/prefer-default-export
function todoItemRoute(app) {
  app.get('/todolist/:todoListId/todoitem/:todoItemId', _todoitem.getTodoItem);
  app.get('/todolist/:todoListId/todoitems', _todoitem.getAllTodoItem);
  app.post('/todolist/:todoListId/todoitem', _todoitem.createTodoItem);
  app["delete"]('/todolist/:todoListId/todoitem/:todoItemId', _todoitem.deleleTodoItem);
  app.put('/todolist/:todoListId/todoitem/:todoItemId', _todoitem.updateTodoItem);
}