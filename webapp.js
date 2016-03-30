var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
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

app.put('/api/todos/:id', function(req, res) {
  var todo = req.body;
  console.log("Modifying todo:", req.params.id, todo);
  var oid = ObjectId(req.params.id);

  db.collection("todos").updateOne({_id: oid}, todo, function(err, result) {
    db.collection("todos").find({_id: oid}).next(function(err, doc) {
      res.send(doc);
    });
  });
});

MongoClient.connect('mongodb://localhost/todosdb', function(err, dbConnection) {
  db = dbConnection;

  var server = app.listen(3000, function() {
	  var port = server.address().port;
	  console.log("Started server at port", port);
  });
});
