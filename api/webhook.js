'use strict';

const he = require('he');
const queryString = require('query-string');

const sendMessage = require('./utils/sendMessage');
const getQuestion = require('./utils/getQuestion');

module.exports.handler = async (event, context, callback) => {
  const { Body, From } = queryString.parse(event.body);
  const { answer } = await getQuestion();

  let response = 'Incorrect..';

  if (Body === answer) {
    response = 'Correct';
  }

  const payload = {
    to: From,
    body: response,
  };

  return sendMessage(payload)
    .then(data => console.log('success', data))
    .catch(err => console.log('error :', err));
};
