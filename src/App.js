var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Redirect = require('react-router').Redirect;

var ToDoBody = require('./ToDoBody').default; //fixes object passing at bundle time, apparently also fixed if using ES6

var NoMatch = React.createClass({
  render: function() {
    return (
      <h2 className="no-match">No match for the route</h2>
    );
  }
});

ReactDOM.render(
  (
    <Router>
      <Route path="/todos" component={ToDoBody} />
      <Redirect from="/" to="/todos" />
      <Route path="*" component={NoMatch} />
    </Router>
  ),
  document.getElementById('main')
);
