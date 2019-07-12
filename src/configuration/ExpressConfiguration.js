import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import flash from 'connect-flash';
import passportConfigure from './PassportConfiguration';
import { todoListRoute, todoItemRoute } from '../todolist';
import { loginRoute, userRoute } from '../user';
import './MongooseConfiguration';

// eslint-disable-next-line import/prefer-default-export
export function ConfigureExpress() {
  const app = express();
  app.use(flash());
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
