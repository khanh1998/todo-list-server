import models from '../configuration/Models';

const listModel = models.List;
export async function createTask(req, res) {
  // after is processed by Passport authenticate
  // request object will be added more field
  // user is one of them, there are still more fields of Passport
  // user contain all information of the login user
  const { id } = req.user;
  const { listId } = req.params;
  const {
    name, steps, description, note, expirationTime, remindingTime, priority, repeat,
  } = req.body;
  const completed = false;
  const created = {
    time: Date.now(),
    creator: id,
  };
  const task = {
    name,
    steps,
    description,
    note,
    expirationTime,
    remindingTime,
    completed,
    priority,
    repeat,
    created,
  };

  try {
    const list = await listModel.findOne({ _id: listId, 'members.id': id });

    if (list) {
      await list.tasks.push(task);
      const createdDoc = await list.save();
      res.status(200).json(createdDoc.tasks[createdDoc.tasks.length - 1]);
    } else {
      res.status(400).json({
        success: false,
        message: `Todo list ${listId} is not existed`,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function getTask(req, res) {
  const { listId, taskId } = req.params;
  // after is processed by Passport authenticate
  // request object will be added more field
  // user is one of them, there are still more fields of Passport
  // user contain all information of the login user
  const { id } = req.user;
  try {
    const doc = await listModel.findOne({ _id: listId, 'members.id': id });
    if (doc) {
      const task = await doc.task.id(taskId);
      if (task) {
        res.status(200).json(task);
      } else {
        res.status(400).json({
          success: false,
          message: `Todo item ${taskId} is not existed`,
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message: `Todo list ${listId} is not existed`,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function getAllTasks(req, res) {
  const { listId } = req.params;
  // after is processed by Passport authenticate
  // request object will be added more field
  // user is one of them, there are still more fields of Passport
  // user contain all information of the login user
  const { id } = req.user;
  try {
    const list = await listModel.findOne({ _id: listId, 'members.id': id });
    if (list) {
      res.status(200).json(list.tasks);
    } else {
      res.status(400).json({
        success: false,
        message: `Todo list ${listId} is not existed`,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function deleleteTask(req, res) {
  const { listId, taskId } = req.params;
  // after is processed by Passport authenticate
  // request object will be added more field
  // user is one of them, there are still more fields of Passport
  // user contain all information of the login user
  const { id } = req.user;
  try {
    const list = await listModel.findOne({ _id: listId, 'members.id': id });
    if (list) {
      const deleteIndex = list.task.findIndex(task => task.id.valueOf().toString() === taskId);
      if (deleteIndex > -1) {
        const deleted = list.tasks.splice(deleteIndex, 1);
        await list.save();
        res.status(200).json(deleted);
      } else {
        res.status(400).json({
          success: false,
          message: `Todo item ${taskId} is not existed`,
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message: `Todo list ${listId} is not existed`,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function updateTask(req, res) {
  // after is processed by Passport authenticate
  // request object will be added more field
  // user is one of them, there are still more fields of Passport
  // user contain all information of the login user
  const { id } = req.user;
  const { listId, taskId } = req.params;
  const {
    steps, name, description, note, completed, expirationTime, remindingTime, priority, repeat,
  } = req.body;
  const lastModified = {
    time: Date.now(),
    modifier: id,
  };
  try {
    const list = await listModel.findOne({ _id: listId, 'members.id': id });

    if (list) {
      const task = await list.tasks.id(taskId);
      if (task) {
        task.set('steps', steps);
        task.set('name', name);
        task.set('description', description);
        task.set('note', note);
        task.set('completed', completed);
        task.set('expirationTime', expirationTime);
        task.set('remindingTime', remindingTime);
        task.set('priority', priority);
        task.set('repeat', repeat);
        task.set('lastModified', lastModified);
        const updatedList = await list.save();
        res.status(200).json(await updatedList.tasks.id(taskId));
      } else {
        res.status(400).json({
          success: false,
          message: `Todo item ${taskId} is not existed`,
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message: `Todo list ${listId} is not existed`,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
