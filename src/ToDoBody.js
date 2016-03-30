var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

var ToDoForm = require('./ToDoForm');
var ToDoTable = require('./ToDoTable');

var ToDoBody = React.createClass({
    getInitialState: function() {
        return { todos: [] };
    },
    render: function() {
        return (
            <div className="todo-body">
                <h3 className="sub_header">What Do I Need To Do Today?</h3>

                <div className="todo-content">
                    <ToDoForm onTodoSubmit={this.addTodo} />
                    <ToDoTable todoArray={this.state.todos} />
                </div>

                <div className="todo-footer">
                    <p className="lower-text">Click on a ToDo item to edit the title</p>
                </div>

                <div className="page-bottom">
                    <p className="lower-text">(Hit 'ctrl + h' to toggle app state visibility via Redux)</p>
                </div>
            </div>
        );
    },

    componentDidMount: function() {
        this.loadData();
    },

    loadData: function() {
        //jquery ajax call instead of custom, because time constraints
        $.ajax('/api/todos').done(function(data) {
            this.setState({todos: data});
        }.bind(this));
    },

    addTodo: function(todo) {
        //jquery ajax call instead of custom, because time constraints
        $.ajax({
            type: 'POST', url: '/api/todos', contentType: 'application/json',
            data: JSON.stringify(todo),
            success: function(data) {
                var todo = data;

                //TODO: not entirely sure if this is best practice, will test
                var todosModified = this.state.todos.concat(todo);
                this.setState({todos: todosModified});
            }.bind(this),
                error: function(xhr, status, err) {
                console.log("Error adding todo:", err);
            }
        });
    }

});

module.exports = ToDoBody;
