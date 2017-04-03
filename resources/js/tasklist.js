const React = require('react');
const axios = require('axios');

const Task = require('./task');

class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: null,
    };
    this.fetchData();
  }
  fetchData() {
    axios.get('/tasklist/get')
      .then((response) => {
        // this.setState({tasks: response.data.tasks});
        this.setState({tasks: ['hi', 'sup', 'bye']});
      })
      .catch((error) => {
        console.log('Error fetching tasks:', error);
      });
  }
  save() {
    axios.post('/tasklist/save', {
        params: {
          tasks: this.state.tasks,
        }
      })
      .then((response) => {
        const tasks = response.data.tasks;
        const taskItems = tasks.map((taskText) => <Task/>);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    if (this.state.tasks) {
      const taskItems = this.state.tasks.map((taskText) => <Task/>);
      return (
        <div>
          {taskItems}
        </div>
      )
    } else {
      return (
        <div>Loading...</div>
      );
    }
  }
}

module.exports = TaskList;
