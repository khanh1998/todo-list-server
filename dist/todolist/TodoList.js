"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var SubTodoItem = new _mongoose["default"].Schema({
  title: {
    type: String,
    required: [true, 'Title of todo item is required'],
    minlength: 5,
    maxlength: 200,
    trim: true
  },
  completed: {
    type: Boolean,
    "default": false
  }
});
var TodoItem = new _mongoose["default"].Schema({
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 200
  },
  subTodo: {
    type: [SubTodoItem],
    validate: function validate(subTodo) {
      if (subTodo.length < 100) return true;
      return false;
    }
  },
  description: {
    type: String,
    maxlength: 1000
  },
  note: {
    type: String,
    maxlength: 1000
  },
  expireDate: {
    type: Date
  },
  remindTime: {
    type: Date
  },
  completed: {
    type: Boolean,
    "default": false
  },
  isCompleted: {
    type: Boolean,
    get: function get() {
      if (this.completed) return true; // eslint-disable-next-line consistent-return

      this.subTodo.forEach(function (element) {
        if (!element.completed) return false;
      });
      return true;
    }
  }
});

function callback(next) {
  if (this.isModified('remindTime') || this.isModified('expireDate') || this.isNew) {
    if (this.remindTime.getTime() <= this.expireDate.getTime()) return next();
    return next(new Error('Remind time must less or equal to expire date'));
  }

  return next();
}

TodoItem.pre('save', callback);
var Onwer = new _mongoose["default"].Schema({
  userId: {
    type: _mongoose["default"].SchemaTypes.ObjectId,
    ref: 'User',
    required: true
  }
});
var TodoList = new _mongoose["default"].Schema({
  list: {
    type: [TodoItem]
  },
  owners: {
    type: [Onwer] // required: true,
    // validate: (owner) => {
    //     return (owner.length > 0);
    // }

  },
  name: {
    type: String,
    required: [true, 'Name of todo list is required'],
    minlength: [1, 'Minimun length of todo list\'s name is 1 character'],
    maxlength: [200, 'Maximum length of todo list\'s name is 200 character']
  },
  description: {
    type: String,
    minlength: [1, 'Minimun length of todo list\'s description is 1 character'],
    maxlength: [1000, 'Maximum length of todo list\'s description is 1000 character']
  }
});

var _default = _mongoose["default"].model('TodoList', TodoList);

exports["default"] = _default;