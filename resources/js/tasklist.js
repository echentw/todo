const React = require('react');
const _ = require('lodash');

const IdGen = require('./utils/id-gen');
const idGen = new IdGen();

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

    const {name} = props;
    const {tasks} = props;

    // Give a unique id to each task
    for (let i = 0; i < tasks.length; ++i) {
      tasks[i].id = idGen.get();
    }

    this.state = {
      name: name,
      tasks: tasks,
      focus: null,
    };

    this.checkHandler = this.checkHandler.bind(this);
    this.focusHandler = this.focusHandler.bind(this);
    this.blurHandler = this.blurHandler.bind(this);
    this.upDownHandler = this.upDownHandler.bind(this);
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

  upDownHandler(id, event) {
    if (event.keyCode == 38) {
      // pressed up
      const index = _.findIndex(this.state.tasks, {'id': id});
      if (index < 1) {
        return;
      }
      this.setState({focus: this.state.tasks[index - 1].id});
    } else if (event.keyCode == 40) {
      // pressed down
      const index = _.findIndex(this.state.tasks, {'id': id});
      if (index > this.state.tasks.length - 2) {
        return;
      }
      this.setState({focus: this.state.tasks[index + 1].id});
    }
  }

  keyDownHandler(id, event) {
    if (event.keyCode == 8) {
    }
  }

  render() {
    const tasks = this.state.tasks.map((task) => {
      const focused = (this.state.focus == task.id);
      return <Task key={task.id}
                   taskText={task.text}
                   id={task.id}
                   focused={focused}
                   completed={task.completed}
                   checkHandler={this.checkHandler}
                   focusHandler={this.focusHandler}
                   blurHandler={this.blurHandler}
                   upDownHandler={this.upDownHandler}
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