import {
  createTask, deleleteTask, getAllTasks, getTask, updateTask,
} from './Task.controller';

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
  app.get('/list/:listId/task/:taskId', authenticate, getTask);
  app.get('/list/:listId/task', authenticate, getAllTasks);
  app.post('/list/:listId/task', authenticate, createTask);
  app.delete('/list/:listId/task/:taskId', authenticate, deleleteTask);
  app.put('/list/:listId/task/:taskId', authenticate, updateTask);
}
