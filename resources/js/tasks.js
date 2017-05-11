const React = require('react');
const ReactDOM = require('react-dom');

const Component = React.Component;

const TASKS = [
  {
    'id': 'jahb',
    'text': 'milk the cow for top quality milk',
  },
  {
    'id': 'nbmv',
    'text': 'visit chicken farm and acquire super large egg',
  },
  {
    'id': 'aesw',
    'text': 'get extra fine flour from Mill Lane Mill',
  },
];

function Task(props) {
  const {taskText} = props;
  return (
    <div className="task-container">
      <div className="checkbox"></div>
      <div className="task-text">{taskText}</div>
      <div className="more-info"></div>
    </div>
  );
}

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: props.tasks,
    };
  }

  render() {
    const tasks = this.state.tasks.map((task) => {
      return <Task key={task.id} taskText={task.text} />
    });
    return (
      <div className="tasks-container">
        {tasks}
      </div>
    );
  }
}

class Application extends Component {
  render() {
    return (
      <TaskList tasks={TASKS} />
    );
  }
}

ReactDOM.render(<Application/>, document.getElementById('tasks'));
