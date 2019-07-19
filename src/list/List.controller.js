import models from '../configuration/Models';

const listModel = models.List;

export async function getAllLists(req, res) {
  try {
    // after is processed by Passport authenticate
    // request object will be added more field
    // user is one of them, there are still more fields of Passport
    // user contain all information of the login user
    const { id } = req.user;
    let resultList = await listModel.find({ 'members.id': id });
    if (resultList) {
      resultList = resultList.flatMap(list => list.toObject({
        virtuals: true,
      }));
      res.status(200).json(resultList);
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
      res.status(200).json(todoList.toObject({
        virtuals: true,
      }));
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
    const doc = await listModel.create(list);
    if (doc) {
      res.status(200).json(doc.toObject({
        virtuals: true,
      }));
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
        res.status(200).json(updated.toObject({
          // because mongoose auto add a id field to the document
          // by enable virtual option
          // we can send id field to client
          virtuals: true,
        }));
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
