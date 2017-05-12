const React = require('react');
const ReactDOM = require('react-dom');

const Component = React.Component;

const LIST_NAME = 'Tasklist 1';
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

function ListName(props) {
  const {name} = props;
  return (
    <textarea className="tasklist-name">{name}</textarea>
  );
}

function Task(props) {
  const {taskText} = props;
  return (
    <div className="task-container">
      <input type="checkbox"  className="checkbox" />
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
