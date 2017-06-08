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
    const {attributes} = this.props;
    const {handlers} = this.props;

    const focusClass = attributes.focused ? ' focused' : '';

    const newHandlers = {
      'focusHandler': handlers.focusHandler,
      'blurHandler': handlers.blurHandler,
      'arrowKeyHandler': handlers.arrowKeyHandler,
      'onChangeHandler': handlers.onChangeHandler,
      'createTask': handlers.createTask,
      'deleteTask': handlers.deleteTask,
    };

    return (
      <div className={'task-container' + focusClass}>
        <CheckBox id={attributes.id}
                  completed={attributes.completed}
                  checkHandler={handlers.checkHandler} />
        <TaskText attributes={attributes} handlers={newHandlers} />
        <TaskInfo />
      </div>
    );
  }
};

module.exports = Task;
