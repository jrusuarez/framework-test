'use strict';

function isApiKeyValid(apiKey) {
  return apiKey.length > 0;
}

function getUserList() {
  return Promise.resolve([{username: 'John'}, {username: 'Peter'}]);
}

function addUser() {
  return Promise.resolve();
}

module.exports = {
  isApiKeyValid: isApiKeyValid,
  getUserList: getUserList,
  addUser: addUser
};
