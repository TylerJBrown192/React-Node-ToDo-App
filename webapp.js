var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;

var app = express();
var db;

app.use(express.static('static'));

app.get('/api/todos', function(req, res) {
  console.log("Query string", req.query);

  db.collection("todos").toArray(function(err, docs) {
    res.json(docs);
  });
});

app.use(bodyParser.json());

app.post('/api/todos/', function(req, res) {
  console.log("Req body:", req.body);

  var newTodo = req.body;

  db.collection("todos").insertOne(newTodo, function(err, result) {
    var newId = result.insertedId;

    db.collection("todos").find({_id: newId}).next(function(err, doc) {
      res.json(doc);
    });
  });
});

app.get('/api/todos/:id', function(req, res) {
  db.collection("todos").findOne({_id: ObjectId(req.params.id)}, function(err, todo) {
    res.json(todo);
  });
});


MongoClient.connect('mongodb://localhost:3000/todosdb', function(err, dbConnection) {
    if (err) {
        console.log(err);
        return;
    }

    db = dbConnection;

    //set as global variable
    var server = app.listen(3000, function() {
        var port = server.address().port;
        console.log("Started server at port", port);
    });
});
