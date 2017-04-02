const React = require('react');
const axios = require('axios');

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
    axios.get('/user/tasklist', {
        params: {
          ID: 12345
        }
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

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
