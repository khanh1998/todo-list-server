import models from '../configuration/Models';

const listModel = models.List;

export async function getAllLists(req, res) {
  try {
    // after is processed by Passport authenticate
    // request object will be added more field
    // user is one of them, there are still more fields of Passport
    // user contain all information of the login user
    const { id } = req.user;
    const resultList = await listModel.find({ 'members.id': id });
    if (resultList) {
      // check whether the id of user is added to owners list or not
      // if not auto add user id to owners list
      const list = resultList
        .filter(todo => todo.members.find(member => member.id.valueOf().toString() === id));
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
        message: 'There is no List',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function getList(req, res) {
  const { listId } = req.params;
  // after is processed by Passport authenticate
  // request object will be added more field
  // user is one of them, there are still more fields of Passport
  // user contain all information of the login user
  const { id } = req.user;
  try {
    const todoList = await listModel.findOne({ _id: listId, 'members.id': id });
    if (todoList) {
      res.status(200).json(todoList);
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

export async function createList(req, res) {
  // after is processed by Passport authenticate
  // request object will be added more field
  // user is one of them, there are still more fields of Passport
  // user contain all information of the login user
  const { id } = req.user;
  const {
    tasks, name, description,
  } = req.body;

  tasks.forEach((task) => {
    const t = task;
    t.lastModified = {};
    t.created = {};
    t.created.time = Date.now();
    t.created.creator = id;
    t.steps.forEach((step) => {
      const s = step;
      s.lastModified = {};
      s.created = {};
      s.created.time = Date.now();
      s.created.creator = id;
    });
  });
  const created = {
    time: Date.now(),
    creator: id,
  };
  const isShare = false;
  const shareToken = '';
  const members = [{ id }];
  const lastModified = {};
  const list = {
    tasks, members, name, description, created, isShare, shareToken, lastModified,
  };
  try {
    console.log(JSON.stringify(list));
    const newList = new listModel(list);
    const doc = await listModel.create(list);
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

export async function deleteList(req, res) {
  const { listId } = req.params;
  // after is processed by Passport authenticate
  // request object will be added more field
  // user is one of them, there are still more fields of Passport
  // user contain all information of the login user
  const { id } = req.user;
  try {
    const doc = await listModel.findOne({ _id: listId, 'members.id': id });
    if (doc) {
      let deleted;
      if (doc.created.creator.valueOf().toString() === id) { // if user is the creator of list
        deleted = await listModel.deleteOne({ _id: listId });
      } else { // if user is member of list and want to leave the list
        const deleteIndex = doc.members.findIndex(member => member.id.valueOf().toString() === id);
        doc.members.splice(deleteIndex, 1);
        deleted = await doc.save();
      }
      if (deleted) {
        res.status(200).json({
          success: true,
          message: `Delete list ${doc.name} successfully`,
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Cannot save the change to database',
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message: `The list whose id is ${listId} is not existed`,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function updateList(req, res) {
  // after is processed by Passport authenticate
  // request object will be added more field
  // user is one of them, there are still more fields of Passport
  // user contain all information of the login user
  const { id } = req.user;
  const { listId } = req.params;
  const {
    name, description,
  } = req.body;
  try {
    const doc = await listModel.findOne({ _id: listId, 'members.id': id });
    if (doc) {
      doc.set('name', name);
      doc.set('description', description);
      doc.set('lastModified.time', Date.now());
      doc.set('lastModified.modifier', id);
      const updated = await doc.save();

      if (updated) {
        res.status(200).json(updated);
      } else {
        res.status(500).json({
          success: false,
          message: 'Cannot save changes to database',
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
