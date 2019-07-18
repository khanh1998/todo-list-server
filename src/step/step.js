import Mongoose from 'mongoose';

const Step = new Mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name of step is required'],
    minlength: [1, 'Min length of step name is 1 characters'],
    maxlength: [200, 'Max length of step name is 200 characters'],
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

export default Step;
