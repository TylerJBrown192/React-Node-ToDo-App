var React = require('react');
var ReactDOM = require('react-dom');

var ToDoForm = React.createClass({
    getInitialState: function() {
        return {id: '', todo: ''};//id may not be necessary as we are passing data up, will test
    },
    render: function() {
        return (
            <form className="todo-form" onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    placeholder="To do..."
                    value={this.state.todo}
                    onChange={this.handleTodoChange}
                />

                <input type="submit" value="DoThis"/>
            </form>
        );
    },

    handleTodoChange: function(event) {
        this.setState({todo: event.target.value})
    },
    handleSubmit: function(event) {
        event.preventDefault();

        var newTodoItem = this.state.todo.trim();

        if (!newTodoItem) {
            return;
        }

        this.props.handleTodoSubmit({id: '', todo: newTodoItem});//id may not be necessary as we are passing data up, will test
        this.setState({id: '', todo: ''});
    }
});
