import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import winston from 'winston';
import expressWinston from 'express-winston';
import passportConfigure from './PassportConfiguration';
import listRoute from '../list/list.router';
import taskRoute from '../task/Task.router';
import userRoute from '../user/User.router';
import loginRoute from '../login/Login.router';
import './MongooseConfiguration';

export default () => {
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
  listRoute(app, passport);
  taskRoute(app, passport);
  app.use(expressWinston.errorLogger({
    transports: [
      new winston.transports.Console(),
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json(),
    ),
  }));
  return app;
};
