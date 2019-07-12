import { createUser, getUser, updateUser } from './User.controller';

export default (app) => {
  app.post('/user', createUser);
  app.get('/user/:username', getUser);
  app.put('/user/', updateUser);
};
