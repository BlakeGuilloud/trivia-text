'use strict';

const { handleError, handleSuccess, tryParse } = require('serverless-helpers/responses');
const he = require('he');

const sendMessage = require('./utils/sendMessage');
const getQuestion = require('./utils/getQuestion');

module.exports.handler = (event, context, callback) => {
  return getQuestion()
    .then(shapeDataForTwilio)
    .then(({ body }) => sendMessage({ to: '+18438126962', body }))
    .then(() => callback(null, handleSuccess('Question sent successfully')))
    .catch(err => callback(null, handleError(err)));
};

function shapeDataForTwilio(data) {
  return {
    to: '+18438126962',
    body: `${data.body} \n${data.options.join('\n')}`
  }
}