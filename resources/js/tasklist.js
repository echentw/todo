const React = require('react');

const Task = require('./task');

class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
    };
    this.addTask = () => {
    };
  }
  render() {
    const tasks = ['task 1', 'task 2', 'task 3'];
    const taskItems = tasks.map((taskText) => <Task/>);

    return (
      <div>
        {taskItems}
      </div>
    );
  }
}

module.exports = TaskList;
