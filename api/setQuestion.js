'use strict';

const axios = require('axios');
const { decode } = require('he');
const postQuestion= require('./utils/postQuestion');

module.exports.handler = (event, context, callback) => {
  return axios.get('https://opentdb.com/api.php?amount=1&type=multiple')
    .then(shapeDataForApi)
    .then(postQuestion)
    .catch(console.error);
};

function shapeDataForApi({ data }) {
  const { question, correct_answer, incorrect_answers } = data.results[0];

  return {
    body: decode(question),
    answer: decode(correct_answer),
    options: shuffle(incorrect_answers.concat(correct_answer).map(a => decode(a))),
  }
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }

  return a;
}