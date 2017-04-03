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
        this.setState({
          tasks: [
            {id: '1', value: 'hi', checked: false},
            {id: '2', value: 'sup', checked: true},
            {id: '3', value: 'bye', checked: false},
          ]
        });
      })
      .catch((error) => {
        console.log('Error fetching tasks:', error);
      });
  }
  toggle(e) {
    console.log(e);
  }
  save() {
    axios.post('/tasklist/save', {
        params: {
          tasks: this.state.tasks,
        }
      })
      .then((response) => {
        const tasks = response.data.tasks;
        const taskItems = tasks.map((task) => <Task/>);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    if (this.state.tasks) {
      const taskItems = this.state.tasks.map((task) =>
        <Task id={task.id} value={task.value} checked={task.checked} toggle={this.toggle}/>
      );
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
