const mongoose = require('mongoose');


// Goals Schema
const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'please enter your name']
    },
    email: {
        type: String,
        required: [true, 'please enter your email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'please enter your password']
    },
    date: {
        type: Date,
        default: Date.now
    },
  },{
      timestamps: true
  });


  const posttwo = mongoose.model('USER', userSchema);
  module.exports = posttwo;