import express from 'express';
import cors from 'cors';
import { todoListRoute, todoItemRoute } from '../todolist';
import './MongooseConfiguration';

// @flow
// eslint-disable-next-line import/prefer-default-export
export function ConfigureExpress() {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  todoListRoute(app);
  todoItemRoute(app);
  return app;
}
