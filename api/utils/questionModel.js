const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  body: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  options: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model('Question', QuestionSchema);