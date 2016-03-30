#!/usr/bin/mongo

var db = new Mongo().getDB("todosdb");

db.todos.remove({});

db.todos.insert([
    {id:0 , todo: "Grocery shopping"},
    {id:1 , todo: "Go to the mall"},
    {id:2 , todo: "Buy a new watch"}
]);
