import {
  createTodoList, deleteTodoList, getAllTodoLists, getTodoList, updateTodoList,
} from './TodoList.controller';

// eslint-disable-next-line import/prefer-default-export
export const todoListRoute = (app) => {
  app.get('/todolists', getAllTodoLists);
  app.get('/todolist/:todoListId', getTodoList);
  app.post('/todolist', createTodoList);
  app.put('/todolist/:todoListId', updateTodoList);
  app.delete('/todolist/:todoListId', deleteTodoList);
};
