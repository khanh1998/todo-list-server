import {
  createTodoList, deleteTodoList, getAllTodoLists, getTodoList, updateTodoList,
} from './TodoList.controller';

// eslint-disable-next-line import/prefer-default-export
export const todoListRoute = (app, passport) => {
  const authenticate = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (err) next(err);
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(401).json({
          success: false,
          message: info.message,
        });
      }
    })(req, res, next);
  };
  app.get('/todolists', authenticate, getAllTodoLists);
  app.get('/todolist/:todoListId', authenticate, getTodoList);
  app.post('/todolist', authenticate, createTodoList);
  app.put('/todolist/:todoListId', authenticate, updateTodoList);
  app.delete('/todolist/:todoListId', authenticate, deleteTodoList);
};
