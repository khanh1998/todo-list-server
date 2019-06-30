"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.todoListRoute = void 0;

var _TodoList = require("./TodoList.controller");

// eslint-disable-next-line import/prefer-default-export
var todoListRoute = function todoListRoute(app) {
  app.get('/todolists', _TodoList.getAllTodoLists);
  app.get('/todolist/:todoListId', _TodoList.getTodoList);
  app.post('/todolist', _TodoList.createTodoList);
  app.put('/todolist/:todoListId', _TodoList.updateTodoList);
  app["delete"]('/todolist/:todoListId', _TodoList.deleteTodoList);
};

exports.todoListRoute = todoListRoute;