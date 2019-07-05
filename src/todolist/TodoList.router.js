import {
  createTodoList, deleteTodoList, getAllTodoLists, getTodoList, updateTodoList,
} from './TodoList.controller';

// eslint-disable-next-line import/prefer-default-export
export const todoListRoute = (app, passport) => {
  app.get('/todolists', passport.authenticate('jwt', { session: false }), getAllTodoLists);
  app.get('/todolist/:todoListId', passport.authenticate('jwt', { session: false }), getTodoList);
  app.post('/todolist', passport.authenticate('jwt', { session: false }), createTodoList);
  app.put('/todolist/:todoListId', passport.authenticate('jwt', { session: false }), updateTodoList);
  app.delete('/todolist/:todoListId', passport.authenticate('jwt', { session: false }), deleteTodoList);
};
