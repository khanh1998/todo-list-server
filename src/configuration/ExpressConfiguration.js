import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import passportConfigure from './PassportConfiguration';
import { todoListRoute } from '../list/list.router';
import { todoItemRoute } from '../task/Task.router';
import userRoute from '../user/User.router';
import loginRoute from '../login/Login.router';
import './MongooseConfiguration';

// eslint-disable-next-line import/prefer-default-export
export function ConfigureExpress() {
  const app = express();
  app.use(helmet());
  app.use(morgan('dev'));
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  const passport = passportConfigure();
  app.use(passport.initialize());
  loginRoute(app, passport);
  userRoute(app, passport);
  todoListRoute(app, passport);
  todoItemRoute(app, passport);
  return app;
}
