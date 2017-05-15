const React = require('react');
const ReactDOM = require('react-dom');

const Component = React.Component;

const LIST_NAME = 'Tasklist 1';
const TASKS = [
  {'id': 'bbba', 'text': 'milk the cow for top quality milk'},
  {'id': 'bbbb', 'text': 'visit chicken farm and acquire super large egg'},
  {'id': 'bbbc', 'text': 'get extra fine flour from Mill Lane Mill'},
  {'id': 'bbbd', 'text': 'something'},
  {'id': 'bbbe', 'text': 'something'},
  {'id': 'bbbf', 'text': 'something'},
  {'id': 'bbbg', 'text': 'something'},
  {'id': 'bbbh', 'text': 'something'},
  {'id': 'bbbi', 'text': 'something'},
  {'id': 'bbbj', 'text': 'something'},
  {'id': 'bbbk', 'text': 'something'},
  {'id': 'bbbl', 'text': 'something'},
];

function ListName(props) {
  const {name} = props;
  return (
    <div className="tasklist-name-container">
      <textarea className="tasklist-name">{name}</textarea>
    </div>
  );
}

function Task(props) {
  const {taskText} = props;
  return (
    <div className="task-container">
      <div className="checkbox-container">
        <input type="checkbox"  className="checkbox" />
        <label></label>
      </div>
      <textarea className="task-text">{taskText}</textarea>
      <div className="more-info"></div>
    </div>
  );
}

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      tasks: props.tasks,
    };
  }

  render() {
    const tasks = this.state.tasks.map((task) => {
      return <Task key={task.id} taskText={task.text} />
    });
    return (
      <div className="tasks-container">
        <ListName name={this.state.name} />
        {tasks}
      </div>
    );
  }
}

class Application extends Component {
  render() {
    return (
      <TaskList tasks={TASKS} name={LIST_NAME} />
    );
  }
}

ReactDOM.render(<Application/>, document.getElementById('tasks'));
