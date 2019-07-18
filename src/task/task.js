import Mongoose from 'mongoose';
import Step from '../step/step';

const Task = new Mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Task name is required'],
    minlength: [1, 'Min length of task name is 1 characters'],
    maxlength: [200, 'Max length of task name is 200 characters'],
  },
  steps: {
    type: [Step],
    validate: {
      validator: (steps) => {
        if (steps.length < 100) return true;
        return false;
      },
      msg: 'One task can only has maximum 100 steps',
    },
  },
  description: {
    type: String,
    maxlength: [500, 'Maximum length of description is 500 characters'],
  },
  note: {
    type: String,
    maxlength: [500, 'Maximum length of Note is 500 characters'],
  },
  expirationTime: {
    type: Number,
  },
  remindingTime: {
    type: Number,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  priority: {
    type: Number,
    validate: {
      validator: (priority) => {
        if (priority < 1 || priority > 5) {
          return false;
        }
        return true;
      },
      msg: 'Priority is a integer number whose value ranges from 1 to 5',
    },
  },
  repeat: {
    type: {
      days: Number,
      weeks: {
        period: Number,
        daysInWeek: [Number],
      },
      months: Number,
      year: Number,
    },
    validate: {
      validator: () => true,
      msg: 'Repeat data is not right',
    },
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
});

function callback(next) {
  if (this.isModified('remindTime') || this.isModified('expireDate') || this.isNew) {
    if (this.remindingTime <= this.expirationTime) return next();
    return next(new Error('Remind time must less or equal to expire date'));
  }
  return next();
}

Task.pre('save', callback);

export default Task;
