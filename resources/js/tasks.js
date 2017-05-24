const React = require('react');
const ReactDOM = require('react-dom');

const _ = require('lodash');

const Component = React.Component;

const LIST_NAME = 'Tasklist 1';
const TASKS = [
  {'id': 'bbba', 'completed': false, 'text': 'milk the cow for top quality milk'},
  {'id': 'bbbb', 'completed': true, 'text': 'visit chicken farm and acquire super large egg'},
  {'id': 'bbbc', 'completed': false, 'text': 'get extra fine flour from Mill Lane Mill'},
  {'id': 'bbbd', 'completed': false, 'text': ''},
  {'id': 'bbbe', 'completed': true, 'text': 'checkbox animation'},
  {'id': 'bbbj', 'completed': true, 'text': 'strikethrough animation'},
  {'id': 'bbbf', 'completed': false, 'text': 'choose a better font'},
  {'id': 'bbbg', 'completed': false, 'text': 'make the colors look better'},
  {'id': 'bbbh', 'completed': false, 'text': 'make subtasks work'},
  {'id': 'bbbi', 'completed': false, 'text': 'more info right sidebar?'},
  {'id': 'bbbk', 'completed': false, 'text': 'turn animations off for initial render'},
  {'id': 'bbbl', 'completed': true, 'text': 'get rid of blue highlighting when focusing'},
  {'id': 'bbbm', 'completed': false, 'text': 'think of something cool to build with stella'},
];

function ListName(props) {
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

function Task(props) {
  const {taskText} = props;
  const {id} = props;
  const {completed} = props;
  const {focused} = props;
  const {checkHandler} = props;
  const {focusHandler} = props;
  const {blurHandler} = props;

  const strikethroughClass = completed ? ' strikethrough' : '';
  const focusClass = focused ? ' focused' : '';

  function focusDiv(event) {
    event.target.childNodes[3].focus();
  }

  function focusInput(event) {
    event.stopPropagation();
    event.target.focus();
  }

  // &zwnj is a zero-width non-joiner, it is needed to prevent the cursor from
  // behaving unexpectedly when taskText is the empty string.
  return (
    <div className={'task-container' + focusClass}>
      <div className="checkbox-container">
        <input type="checkbox"
               className="checkbox"
               id={id}
               checked={completed}
               onChange={checkHandler}/>
        <label htmlFor={id}></label>
      </div>
      <div className="task-text" onClick={focusDiv}>
        &zwnj;
        <span className={'strikethrough-able' + strikethroughClass}
              contentEditable={true}
              suppressContentEditableWarning={true}
              onClick={focusInput}
              onFocus={focusHandler}
              onBlur={blurHandler}>
          {taskText}
        </span>
      </div>
      <div className="more-info">
        <i className="fa fa-ellipsis-h" aria-hidden="true"></i>
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

  focusHandler(event) {
    const id = event.target.parentNode.parentNode.childNodes[0].childNodes[0].getAttribute('id');
    this.setState({focus: id});
  }

  blurHandler(event) {
    const id = event.target.parentNode.parentNode.childNodes[0].childNodes[0].getAttribute('id');
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
