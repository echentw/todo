const React = require('react');
const ReactDOM = require('react-dom');

const _ = require('lodash');

const Component = React.Component;

const LIST_NAME = 'Tasklist 1';
const TASKS = [
  {'id': 'bbba', 'completed': false, 'text': 'milk the cow for top quality milk'},
  {'id': 'bbbb', 'completed': false, 'text': 'visit chicken farm and acquire super large egg'},
  {'id': 'bbbc', 'completed': false, 'text': 'get extra fine flour from Mill Lane Mill'},
  {'id': 'bbbd', 'completed': false, 'text': 'something'},
  {'id': 'bbbe', 'completed': false, 'text': 'something'},
  {'id': 'bbbf', 'completed': false, 'text': 'something'},
  {'id': 'bbbg', 'completed': false, 'text': 'something'},
  {'id': 'bbbh', 'completed': false, 'text': 'something'},
  {'id': 'bbbi', 'completed': false, 'text': 'something'},
  {'id': 'bbbj', 'completed': false, 'text': 'something'},
  {'id': 'bbbk', 'completed': false, 'text': 'something'},
  {'id': 'bbbl', 'completed': false, 'text': 'something'},
];

function ListName(props) {
  const {name} = props;
  return (
    <div className="tasklist-name-container">
      <div contentEditable={true} className="tasklist-name">{name}</div>
    </div>
  );
}

function Task(props) {
  const {taskText} = props;
  const {id} = props;
  const {completed} = props;
  const {checkHandler} = props;

  const strikethroughClass = completed ? ' strikethrough' : '';

  return (
    <div className="task-container">
      <div className="checkbox-container">
        <input type="checkbox"  className="checkbox" id={id}/>
        <label htmlFor={id} onClick={checkHandler}></label>
      </div>
      <div className="task-text" contentEditable={true}>
        <span className={'strikethrough-able' + strikethroughClass}>
          {taskText}
        </span>
      </div>
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

    this.checkHandler = this.checkHandler.bind(this);
  }

  checkHandler(event) {
    const id = event.target.getAttribute('for');
    const index = _.findIndex(this.state.tasks, {'id': id});

    let tasks = this.state.tasks;
    tasks[index].completed = !tasks[index].completed;

    this.setState({tasks: tasks});
  }

  render() {
    const tasks = this.state.tasks.map((task) => {
      return <Task key={task.id}
                   taskText={task.text}
                   id={task.id}
                   completed={task.completed}
                   checkHandler={this.checkHandler}
             />
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
