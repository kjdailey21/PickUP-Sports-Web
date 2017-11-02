const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;


// Create the connection to the database
const connection = (closure) => {
  return MongoClient.connect('mongodb://localhost:27017/gbs-cloud', (err, db) => {
    if (err) return console.log(err);

    closure(db);
  });
};


// Do some error handling
const sendError = (err, res) => {
  response.status = 501;
  response.message = typeof err == 'object' ? err.message : err;
  res.status(501).json(response);
};


// Response Handling
let response = {
  status: 200,
  data: [],
  message: null
};

//-----------------------------//
// --------- ROUTES -----------//
//-----------------------------//

router.get('/users', (req, res) => {
  connection((db) => {
    db.collection('users')
      .find()
      .toArray()
      .then((users) => {
        response.data = users;
        res.json(response);
      })
      .catch((err) => {
        sendError(err, res);
      });
  });
});

module.exports = router;
