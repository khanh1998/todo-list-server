import {
  createList, deleteList, getAllLists, getList, updateList,
} from './List.controller';

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
  app.get('/list', authenticate, getAllLists);
  app.get('/list/:listId', authenticate, getList);
  app.post('/list', authenticate, createList);
  app.patch('/list/:listId', authenticate, updateList);
  app.delete('/list/:listId', authenticate, deleteList);
};
