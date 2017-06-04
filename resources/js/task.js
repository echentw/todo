const React = require('react');

const Component = React.Component;

const ui = require('./utils/ui');

const TaskText = require('./task-text');

function CheckBox(props) {
  const {id} = props;
  const {completed} = props;
  const {checkHandler} = props;

  return (
    <div className="checkbox-container animated">
      <input type="checkbox"
             className="checkbox"
             id={id}
             checked={completed}
             onChange={checkHandler}/>
      <label htmlFor={id}></label>
    </div>
  );
}

function TaskInfo(props) {
  return (
    <div className="more-info">
      <i className="fa fa-ellipsis-h" aria-hidden="true"></i>
    </div>
  );
}

class Task extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {taskText} = this.props;
    const {id} = this.props;
    const {focused} = this.props;
    const {completed} = this.props;
    const {caretPosition} = this.props;

    const {checkHandler} = this.props;
    const {focusHandler} = this.props;
    const {blurHandler} = this.props;
    const {arrowKeyHandler} = this.props;
    const {onChangeHandler} = this.props;

    const {createTask} = this.props;
    const {deleteTask} = this.props;

    const focusClass = focused ? ' focused' : '';

    return (
      <div className={'task-container' + focusClass}>
        <CheckBox id={id}
                  completed={completed}
                  checkHandler={checkHandler} />

        <TaskText id={id}
                  completed={completed}
                  focused={focused}
                  caretPosition={caretPosition}
                  focusHandler={focusHandler}
                  blurHandler={blurHandler}
                  arrowKeyHandler={arrowKeyHandler}
                  onChangeHandler={onChangeHandler}
                  createTask={createTask}
                  deleteTask={deleteTask}
                  taskText={taskText} />

        <TaskInfo />
      </div>
    );
  }
};

module.exports = Task;
