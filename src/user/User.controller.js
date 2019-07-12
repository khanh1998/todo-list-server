import models from '../configuration/loadModel';

const UserModel = models.User;

export async function createUser(req, res) {
  try {
    const {
      username, password, avatar, email,
    } = req.body;
    const user = {
      username, password, avatar, email,
    };
    const isExistedUsername = await UserModel.findOne({ username });
    if (!isExistedUsername) {
      const newUser = new UserModel(user);
      const created = await newUser.save();
      if (created) {
        res.status(200).json(created);
      } else {
        res.status(400).json({
          success: false,
          message: 'Cannot create user, check your parameter',
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message: `Username ${username} is taken already, please choose another username`,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
export async function getUser(req, res) {
  try {
    const { username } = req.params;
    const user = await UserModel.findOne({ username });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(400).json({
        success: false,
        message: `User ${username} is not existed!`,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function updateUser(req, res) {
  try {
    // after is processed by Passport authenticate
    // request object will be added more field
    // user is one of them, there are still more fields of Passport
    // user contain all information of the login user
    const { id } = req.user;
    const {
      password, avatar, email,
    } = req.body;
    const user = await UserModel.findOne({ _id: id });
    if (user) {
      user.password = password;
      user.avatar = avatar;
      user.email = email;
      const updated = await user.save();
      res.status(200).json(updated);
    } else {
      res.status(400).json({
        success: false,
        message: 'Cannot update user information',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
