import Mongoose from 'mongoose';

const SubTodoItem = new Mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title of todo item is required'],
    minlength: 5,
    maxlength: 200,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});
const TodoItem = new Mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 200,
  },
  subTodo: {
    type: [SubTodoItem],
    validate: (subTodo) => {
      if (subTodo.length < 100) return true;
      return false;
    },
  },
  description: {
    type: String,
    maxlength: 1000,
  },
  note: {
    type: String,
    maxlength: 1000,
  },
  expireDate: {
    type: Date,
  },
  remindTime: {
    type: Date,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  isCompleted: {
    type: Boolean,
    get: function get() {
      if (this.completed) return true;
      // eslint-disable-next-line consistent-return
      this.subTodo.forEach((element) => {
        if (!element.completed) return false;
      });
      return true;
    },
  },
});

function callback(next) {
  if (this.isModified('remindTime') || this.isModified('expireDate') || this.isNew) {
    if (this.remindTime.getTime() <= this.expireDate.getTime()) return next();
    return next(new Error('Remind time must less or equal to expire date'));
  }
  return next();
}

TodoItem.pre('save', callback);

const Onwer = new Mongoose.Schema({
  userId: {
    type: Mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
  },
});
const TodoList = new Mongoose.Schema({
  list: {
    type: [TodoItem],
  },
  owners: {
    type: [Onwer],
    required: [true, 'A to-do list must have at least one owner'],
    validate: owners => (owners.length > 0),
  },
  name: {
    type: String,
    required: [true, 'Name of todo list is required'],
    minlength: [1, 'Minimun length of todo list\'s name is 1 character'],
    maxlength: [200, 'Maximum length of todo list\'s name is 200 character'],
  },
  description: {
    type: String,
    minlength: [1, 'Minimun length of todo list\'s description is 1 character'],
    maxlength: [1000, 'Maximum length of todo list\'s description is 1000 character'],
  },
});

export default Mongoose.model('TodoList', TodoList);
