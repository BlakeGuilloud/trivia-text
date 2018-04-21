const mongoose = require('mongoose');
mongoose.Promise = Promise;

const Question = require('./questionModel');

const postQuestion = async (payload) => {
  const { MONGODB_URI, QUESTION_ID } = process.env;

  mongoose.connect(MONGODB_URI);

  try {
    const question = await Question.findByIdAndUpdate(QUESTION_ID, payload);
  } catch (err) {
    throw new Error('Error: ', err);
  } finally {
    mongoose.connection.close();
  }
}



module.exports = postQuestion;