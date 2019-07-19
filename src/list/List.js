import Mongoose from 'mongoose';
import Task from '../task/task';

const Member = new Mongoose.Schema({
  id: {
    type: Mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
  },
});
const List = new Mongoose.Schema({
  tasks: {
    type: [Task],
  },
  members: {
    type: [Member],
    required: [true, 'A to-do list must have at least one owner'],
    validate: {
      validator: members => (members.length > 0),
      msg: 'A to-do list must have at least one owner',
    },
  },
  name: {
    type: String,
    required: [true, 'Name of todo list is required'],
    minlength: [1, 'Minimun length of todo list\'s name is 1 character'],
    maxlength: [200, 'Maximum length of todo list\'s name is 200 character'],
  },
  description: {
    type: String,
    maxlength: [500, 'Maximum length of todo list\'s description is 1000 character'],
  },
  isShare: {
    type: Boolean,
  },
  shareToken: {
    type: String,
  },
  created: {
    time: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
    },
    creator: {
      type: Mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  lastModified: {
    time: {
      type: Number,
    },
    location: {
      type: String,
    },
    modifier: {
      type: Mongoose.SchemaTypes.ObjectId,
      ref: 'User',
    },
  },
});
export default Mongoose.model('TodoList', List);
