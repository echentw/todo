const React = require('react');
const ReactDOM = require('react-dom');

const TaskList = require('./tasklist');

class Application extends React.Component {
  render() {
    return (
      <TaskList/>
    );
  }
}

ReactDOM.render(
  <Application/>,
  document.getElementById('root')
);
