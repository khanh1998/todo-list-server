import models from '../configuration/loadModel';

const todoListModel = models.TodoList;

export async function getAllTodoLists(req, res) {
  try {
    // after is processed by Passport authenticate
    // request object will be added more field
    // user is one of them, there are still more fields of Passport
    // user contain all information of the login user
    const { id } = req.user;
    const resultList = await todoListModel.find({ 'owners.userId': id });
    if (resultList) {
      // check whether the id of user is added to owners list or not
      // if not auto add user id to owners list
      const list = resultList.filter(todo => todo.owners.find(owner => owner.userId.valueOf().toString() === id));
      if (!list) {
        res.status(401).json({
          success: false,
          message: 'You don\'t have any todo list',
        });
      } else {
        res.status(200).json(list);
      }
    } else {
      res.status(400).json({
        success: false,
        message: 'There is no TodoList',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function getTodoList(req, res) {
  const { todoListId } = req.params;
  // after is processed by Passport authenticate
  // request object will be added more field
  // user is one of them, there are still more fields of Passport
  // user contain all information of the login user
  const { id } = req.user;
  try {
    const todoList = await todoListModel.findOne({ _id: todoListId, 'owners.userId': id });
    if (todoList) {
      res.status(200).json(todoList);
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

export async function createTodoList(req, res) {
  // after is processed by Passport authenticate
  // request object will be added more field
  // user is one of them, there are still more fields of Passport
  // user contain all information of the login user
  const { id } = req.user;
  const {
    list, owners, name, description,
  } = req.body;

  // the expireDate and remindTime are String type when the server receive it
  // we need to parse these field to Date type
  list.forEach((todo) => {
    const t = todo;
    t.expireDate = Date.parse(t.expireDate);
    t.remindTime = Date.parse(t.remindTime);
  });
  // check whether the id of user is added to owners list or not
  // if not auto add user id to owners list
  const hasAddId = owners.find(owner => owner.userId.valueOf().toString() === id);
  if (!hasAddId) owners.push({ userId: id });
  const todoList = {
    list, owners, name, description,
  };
  try {
    const doc = await todoListModel.create(todoList);
    if (doc) {
      res.status(200).json(doc);
    } else {
      res.status(400).json({
        success: false,
        message: 'Cannot create todo list',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function deleteTodoList(req, res) {
  const { todoListId } = req.params;
  // after is processed by Passport authenticate
  // request object will be added more field
  // user is one of them, there are still more fields of Passport
  // user contain all information of the login user
  const { id } = req.user;
  try {
    const doc = await todoListModel.findOne({ _id: todoListId, 'owners.userId': id });
    if (doc) {
      const onwer = await doc.owners.id(id);
      await doc.owners.pop(onwer);
      await doc.save();
      res.status(200).json({
        success: true,
        message: 'Delete todo list successfully',
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'This todo list is not existed',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function updateTodoList(req, res) {
  // after is processed by Passport authenticate
  // request object will be added more field
  // user is one of them, there are still more fields of Passport
  // user contain all information of the login user
  const { id } = req.user;
  const { todoListId } = req.params;
  const {
    list, owners, name, description,
  } = req.body;
  try {
    const doc = await todoListModel.findOne({ _id: todoListId, 'owners.userId': id });
    if (doc) {
      doc.list = list;
      doc.owners = owners;
      doc.name = name;
      doc.description = description;
      const updated = await doc.save();
      // check whether the user had remove himself from the list or not
      // if yes, he cannot receive the updated list any more
      const isBelongToUserAfterUpdate = updated.owners.find(owner => owner.userId.valueOf().toString() === id);
      if (isBelongToUserAfterUpdate) {
        res.status(200).json(updated);
      } else {
        res.status(200).json({
          success: true,
          message: 'Update successfully, You now cannot access to the to-do list any more',
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message: 'Your parameter is wrong',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
