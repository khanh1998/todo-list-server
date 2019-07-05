"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.todoListRoute = void 0;

var _TodoList = require("./TodoList.controller");

// eslint-disable-next-line import/prefer-default-export
var todoListRoute = function todoListRoute(app, passport) {
  app.get('/todolists', passport.authenticate('jwt', {
    session: false
  }), _TodoList.getAllTodoLists);
  app.get('/todolist/:todoListId', passport.authenticate('jwt', {
    session: false
  }), _TodoList.getTodoList);
  app.post('/todolist', passport.authenticate('jwt', {
    session: false
  }), _TodoList.createTodoList);
  app.put('/todolist/:todoListId', passport.authenticate('jwt', {
    session: false
  }), _TodoList.updateTodoList);
  app["delete"]('/todolist/:todoListId', passport.authenticate('jwt', {
    session: false
  }), _TodoList.deleteTodoList);
};

exports.todoListRoute = todoListRoute;