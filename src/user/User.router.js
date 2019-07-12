import { createUser, getUser, updateUser, deleteUser } from './User.controller';

export default (app, passport) => {
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
  app.post('/user', createUser);
  app.get('/user/:username', getUser);
  app.put('/user/', authenticate, updateUser);
  app.delete('/user/', authenticate, deleteUser);
};
