const React = require('react');
const ReactDOM = require('react-dom');

const Task = require('./task');

class Application extends React.Component {
  render() {
    return (
      <div>
        <Task indent="0" />
        <Task indent="1" />
      </div>
    );
  }
}

ReactDOM.render(
  <Application/>,
  document.getElementById('root')
);
