const mongoose = require('mongoose');


// Goals Schema
const goalSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    text: {
      type: String,
      required: [true, 'Please add a text value'],
    },
  },
  {
    timestamps: true,
  }
)


  const postOne = mongoose.model('GOALS', goalSchema);
  module.exports = postOne; 

  