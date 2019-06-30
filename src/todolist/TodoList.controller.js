import models from '../configuration/loadModel';

const todoListModel = models.TodoList;

export async function getAllTodoLists(req, res) {
  try {
    // let resultList = await todoListModel.find({ owners: [{ userId: userId }] });
    const resultList = await todoListModel.find({});
    if (resultList) {
      res.status(200).json(resultList);
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
  try {
    // let todoList = await todoListModel
    //     .findById(todoListId)
    //     .where('owners', [{ userId: userId }])
    //     .exec();
    const todoList = await todoListModel.findOne({ _id: todoListId });
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
  const {
    list, owner, name, description,
  } = req.body;

  list.forEach((todo) => {
    const t = todo;
    t.expireDate = Date.parse(t.expireDate);
    t.remindTime = Date.parse(t.remindTime);
  });
  const todoList = {
    list, owner, name, description,
  };
  try {
    const doc = await todoListModel.create(todoList);
    if (doc) res.status(200).json(doc);
    else {
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
  let userId;
  try {
    // let doc = await todoListModel.findOne({ _id: todoListId, owners: [{ userId: userId }] });
    const doc = await todoListModel.findOne({ _id: todoListId });
    if (doc) {
      const onwer = await doc.owners.id(userId);
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
  // let doc = await todoListModel.
  // updateOne({ _id: todoList._id, owners: [{ userId: userId }] }, todoList);
  const { todoListId } = req.params;
  const {
    list, owners, name, description,
  } = req.body;
  try {
    const doc = await todoListModel.findOne({ _id: todoListId });

    if (doc) {
      doc.list = list;
      doc.owners = owners;
      doc.name = name;
      doc.description = description;
      const updated = await doc.save();
      res.status(200).json(updated);
    } else {
      res.status(400).json({
        success: false,
        message: 'Cannot update todo list',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
