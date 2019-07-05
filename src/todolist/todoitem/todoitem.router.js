import {
  createTodoItem, deleleTodoItem, getAllTodoItem, getTodoItem, updateTodoItem,
} from './todoitem.controller';

// eslint-disable-next-line import/prefer-default-export
export function todoItemRoute(app, passport) {
  app.get('/todolist/:todoListId/todoitem/:todoItemId', passport.authenticate('jwt', { session: false }), getTodoItem);
  app.get('/todolist/:todoListId/todoitems', passport.authenticate('jwt', { session: false }), getAllTodoItem);
  app.post('/todolist/:todoListId/todoitem', passport.authenticate('jwt', { session: false }), createTodoItem);
  app.delete('/todolist/:todoListId/todoitem/:todoItemId', passport.authenticate('jwt', { session: false }), deleleTodoItem);
  app.put('/todolist/:todoListId/todoitem/:todoItemId', passport.authenticate('jwt', { session: false }), updateTodoItem);
}
