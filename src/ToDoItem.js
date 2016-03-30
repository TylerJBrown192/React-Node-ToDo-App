var React = require('react');
var ReactDOM = require('react-dom');

var ToDoItem = React.createClass({
    render: function() {
        return (
            <div className="todo-item">
                <div className="todo-done">Done</div>

                <div className="todo-content">
                    <p>{this.props.todoTask}</p>
                </div>

                <div className="todo-delete">
                    X
                </div>
            </div>
        );
    }
});
