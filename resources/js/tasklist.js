const React = require('react');
const _ = require('lodash');

const Component = React.Component;

const Task = require('./task');

function TaskListName(props) {
  const {name} = props;
  return (
    <div className="tasklist-name-container">
      <div contentEditable={true}
           className="tasklist-name"
           suppressContentEditableWarning={true}>
        {name}
      </div>
    </div>
  );
}

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      tasks: props.tasks,
      focus: null,
    };

    this.checkHandler = this.checkHandler.bind(this);
    this.focusHandler = this.focusHandler.bind(this);
    this.blurHandler = this.blurHandler.bind(this);
  }

  checkHandler(event) {
    const id = event.target.getAttribute('id');
    const index = _.findIndex(this.state.tasks, {'id': id});

    let tasks = this.state.tasks;
    tasks[index].completed = !tasks[index].completed;

    this.setState({tasks: tasks});
  }

  focusHandler(id) {
    this.setState({focus: id});
  }

  blurHandler(id) {
    if (id == this.state.focus) {
      this.setState({focus: null});
    }
  }

  render() {
    const tasks = this.state.tasks.map((task) => {
      const focused = (this.state.focus === task.id);
      return <Task key={task.id}
                   taskText={task.text}
                   id={task.id}
                   focused={focused}
                   completed={task.completed}
                   checkHandler={this.checkHandler}
                   focusHandler={this.focusHandler}
                   blurHandler={this.blurHandler}
             />
    });
    return (
      <div className="tasks-container">
        <TaskListName name={this.state.name} />
        {tasks}
      </div>
    );
  }
}

module.exports = TaskList;
