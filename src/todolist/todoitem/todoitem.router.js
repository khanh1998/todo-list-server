import {
  createTodoItem, deleleTodoItem, getAllTodoItem, getTodoItem, updateTodoItem,
} from './todoitem.controller';

// eslint-disable-next-line import/prefer-default-export
export function todoItemRoute(app) {
  app.get('/todolist/:todoListId/todoitem/:todoItemId', getTodoItem);
  app.get('/todolist/:todoListId/todoitems', getAllTodoItem);
  app.post('/todolist/:todoListId/todoitem', createTodoItem);
  app.delete('/todolist/:todoListId/todoitem/:todoItemId', deleleTodoItem);
  app.put('/todolist/:todoListId/todoitem/:todoItemId', updateTodoItem);
}
