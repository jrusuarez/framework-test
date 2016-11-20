'use strict';
const bodyParser = require('body-parser');
const model = require('./mockModel');
const app = require('express')();


// EXERCISE: FIND AND CORRECT MISTAKES OR THINGS THAT SHOULD BE IMPROVED
// IN THE FOLLOWING EXAMPLE OF A VERY SIMPLE API.

app.use(bodyParser.json());

app.get('/getUserList', (req, res) => {
  let apiKey = req.query.apiKey;
  if (!model.isApiKeyValid(apiKey)) {
    return res.status(400).send();
  }

  let offset = req.query.offset || 0;
  let limit = req.query.limit || 10;

  if (typeof offset !== 'number' || typeof limit !== 'number') {
    return res.status(500).send();
  }

  model.getUserList({offset: offset, limit: limit})
  .then((userList) => {
    res.status(200).json(userList);
  });
});

app.post('/addUser', (req, res) => {
  let apiKey = req.body.apiKey;
  if (!model.isApiKeyValid(apiKey)) {
    return res.status(400).send();
  }

  let username = req.body.username;
  let password = req.body.password;

  if (typeof username !== 'string' || typeof password !== 'string' ||
      username.length < 3 || password.length < 8) {
    return res.status(500).send();
  }

  model.addUser(req.body)
    .then(() => {
      res.status(200).send();
    });
});


let port = 8000;
app.listen(port, function () {
  console.log('Server listening at', port);
});
