import {
  createTodoItem, deleleTodoItem, getAllTodoItem, getTodoItem, updateTodoItem,
} from './todoitem.controller';

// eslint-disable-next-line import/prefer-default-export
export function todoItemRoute(app, passport) {
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
  app.get('/todolist/:todoListId/todoitem/:todoItemId', authenticate, getTodoItem);
  app.get('/todolist/:todoListId/todoitems', authenticate, getAllTodoItem);
  app.post('/todolist/:todoListId/todoitem', authenticate, createTodoItem);
  app.delete('/todolist/:todoListId/todoitem/:todoItemId', authenticate, deleleTodoItem);
  app.put('/todolist/:todoListId/todoitem/:todoItemId', authenticate, updateTodoItem);
}
