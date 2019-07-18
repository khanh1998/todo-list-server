import models from '../configuration/Models';

export async function getAllSteps(req, res) {
  const { listId, taskId } = req.params;
  const { id } = req.user;
  const listModel = models.List;
  try {
    const list = await listModel.findOne({ _id: listId, 'members.id': id });
    if (list) {
      const task = list.tasks.id(taskId);
      if (task) {
        res.status(200).json(task.steps);
      } else {
        res.status(400).json({
          success: false,
          message: `Task whose id is ${taskId} is not existed`,
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message: `List whose id is ${listId} is not existed`,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function getStep(req, res) {
  const { listId, taskId, stepId } = req.params;
  const { id } = req.user;
  const listModel = models.TodoList;
  try {
    const list = await listModel.findOne({ _id: listId, 'members.id': id });
    if (list) {
      const task = list.tasks.id(taskId);
      if (task) {
        const step = task.steps.id(stepId);
        if (step) {
          res.status(200).json(step);
        } else {
          res.status(400).json({
            success: false,
            message: `Step whose id is ${stepId} is not existed`,
          });
        }
      } else {
        res.status(400).json({
          success: false,
          message: `Task whose id is ${taskId} is not existed`,
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message: `List whose id is ${listId} is not existed`,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function createStep(req, res) {
  const { listId, taskId } = req.params;
  const { id } = req.user;
  const { name, completed } = req.body;
  const listModel = models.List;
  try {
    const list = await listModel.findOne({ _id: listId, 'members.id': id });
    if (list) {
      const task = list.tasks.id(taskId);
      if (task) {
        const step = { name, completed };
        task.steps.push(step);
      } else {
        res.status(400).json({
          success: false,
          message: `Task whose id is ${taskId} is not existed`,
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message: `List whose id is ${listId} is not existed`,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function updateStep(req, res) {

}

export async function deleteStep(req, res) {

}