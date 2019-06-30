import models from '../../configuration/loadModel';

const todoListModel = models.TodoList;
// @flow
export async function createTodoItem(req, res) {
  const { todoListId } = req.params;
  let {
    // eslint-disable-next-line prefer-const
    title, subTodo, description, note, expireDate, remindTime,
  } = req.body;
  expireDate = Date.parse(expireDate);
  remindTime = Date.parse(remindTime);
  const completed = false;
  const todoItem = {
    title,
    subTodo,
    description,
    note,
    expireDate,
    remindTime,
    completed,
  };
  try {
    const doc = await todoListModel.findOne({ _id: todoListId });
    if (doc) {
      await doc.list.push(todoItem);
      const created = await doc.save();
      res.status(200).json(created.list[created.list.length - 1]);
    } else {
      res.status(400).json({
        success: false,
        message: `Todo list ${todoListId} is not existed`,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function getTodoItem(req, res) {
  const { todoListId } = req.params;
  const { todoItemId } = req.params;
  try {
    const doc = await todoListModel.findOne({ _id: todoListId });
    if (doc) {
      const todoItem = await doc.list.id(todoItemId);
      if (todoItem) {
        res.status(200).json(todoItem);
      } else {
        res.status(400).json({
          success: false,
          message: `Todo item ${todoItemId} is not existed`,
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message: `Todo list ${todoListId} is not existed`,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function getAllTodoItem(req, res) {
  const { todoListId } = req.params;
  try {
    const doc = await todoListModel.findOne({ _id: todoListId });
    if (doc) {
      res.status(200).json(doc.list);
    } else {
      res.status(400).json({
        success: false,
        message: `Todo list ${todoListId} is not existed`,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function deleleTodoItem(req, res) {
  const { todoListId } = req.params;
  const { todoItemId } = req.params;
  try {
    const doc = await todoListModel.findOne({ _id: todoListId });
    if (doc) {
      const todoItem = doc.list.id(todoItemId);
      if (todoItem) {
        await doc.list.pop(todoItem);
        await doc.save();
        res.status(200).json(todoItem);
      } else {
        res.status(400).json({
          success: false,
          message: `Todo item ${todoItemId} is not existed`,
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message: `Todo list ${todoListId} is not existed`,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function updateTodoItem(req, res) {
  const { todoListId } = req.params;
  const { todoItemId } = req.params;
  const {
    title, subTodo, description, note, expireDate, remindTime, completed,
  } = req.body;
  try {
    const doc = await todoListModel.findOne({ _id: todoListId });
    if (doc) {
      const todoItem = await doc.list.id(todoItemId);
      if (todoItem) {
        todoItem.title = title;
        todoItem.subTodo = subTodo;
        todoItem.description = description;
        todoItem.note = note;
        todoItem.expireDate = expireDate;
        todoItem.remindTime = remindTime;
        todoItem.completed = completed;
        const updated = await doc.save();
        res.status(200).json(updated.list[updated.list.length - 1]);
      } else {
        res.status(400).json({
          success: false,
          message: `Todo item ${todoItemId} is not existed`,
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message: `Todo list ${todoListId} is not existed`,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
