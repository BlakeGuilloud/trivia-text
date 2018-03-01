'use strict';

const axios = require('axios');
const { handleError, handleSuccess, tryParse } = require('serverless-helpers/responses');

const sendMessage = require('./utils/sendMessage');

module.exports.handler = (event, context, callback) => {
  return axios.get('https://opentdb.com/api.php?amount=1&type=multiple')
    .then(({ data}) => data.results[0])
    .then(({ question }) => sendMessage({ to: '+18438126962', body: question }))
    .then(() => callback(null, handleSuccess('Question sent successfully')))
    .catch(err => callback(null, handleError(err)));
};