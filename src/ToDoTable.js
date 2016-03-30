var React = require('react');
var ReactDOM = require('react-dom');

var ToDoTable = React.createClass({
    render: function() {
        var mapTodoArray = this.props.todoArray.map(function(item) {
            return <ToDoItem key={item.id} todoTask={item.todo} />
        });

        return (
            <div className="todo-table">
                {mapTodoArray}
            </div>
        );
    }
});
