import Mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import util from 'util';

const User = new Mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    validate: (username) => {
      const re = /^[a-zA-Z0-9]+$/;
      return re.test(username);
    },
  },
  avatar: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: (email) => {
      const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/;
      return re.test(String(email).toLowerCase());
    },
  },
  todoLists: {
    type: [Mongoose.SchemaTypes.ObjectId],
    ref: 'TodoList',
  },
});

// eslint-disable-next-line func-names
User.pre('save', function (next) {
  const user = this;

  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, (saltError, salt) => {
      if (saltError) return next(saltError);

      bcrypt.hash(user.password, salt, (hashError, hash) => {
        if (hashError) return next(hashError);

        user.password = hash;
        next();
      });
    });
  } else return next();
});

User.methods.comparePassword = async function compare(password) {
  try {
    const user = this;
    const matches = await bcrypt.compare(password, user.password);
    if (matches) {
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
  }
  return false;
};
export default Mongoose.model('User', User);
