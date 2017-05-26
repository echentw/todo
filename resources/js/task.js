const React = require('react');

const Component = React.Component;

function CheckBox(props) {
  const {id} = props;
  const {completed} = props;
  const {checkHandler} = props;

  return (
    <div className="checkbox-container">
      <input type="checkbox"
             className="checkbox"
             id={id}
             checked={completed}
             onChange={checkHandler}/>
      <label htmlFor={id}></label>
    </div>
  );
}

class TaskText extends Component {
  constructor(props) {
    super(props);

    this.textInput = null;

    this.state = {
      id: props.id,
    };

    this.focusHandler = props.focusHandler;
    this.blurHandler = props.blurHandler;
    this.keyDownHandler = props.keyDownHandler;
    this.upDownHandler = props.upDownHandler;

    this.callFocusHandler = this.callFocusHandler.bind(this);
    this.callBlurHandler = this.callBlurHandler.bind(this);
  }

  componentDidUpdate() {
    if (this.props.focused) {
      this.textInput.focus();
    }
  }

  callFocusHandler() {
    this.focusHandler(this.state.id);
  }

  callBlurHandler() {
    this.blurHandler(this.state.id);
  }

  render() {
    const {id} = this.props;
    const {completed} = this.props;
    const {focused} = this.props;

    const {focusHandler} = this.props;
    const {blurHandler} = this.props;
    const {upDownHandler} = this.props;

    const {taskText} = this.props;

    const ref = (input) => this.textInput = input;
    const focus = () => this.textInput.focus();

    const callKeyDownHandler = (event) => {
      if (event.keyCode == 13) {
        // pressed enter
        console.log('pressed enter!');
      } else if (event.keyCode == 8) {
        // pressed backspace
        console.log('pressed backspace');
      } else if (event.keyCode == 38 || event.keyCode == 40) {
        // pressed up or down
        event.preventDefault();
        upDownHandler(id, event);
      }
    };

    const strikethroughClass = completed ? ' strikethrough' : '';

    // &zwnj is a zero-width non-joiner, it is needed to prevent the cursor from
    // behaving unexpectedly when taskText is the empty string.
    return (
      <div className="task-text" onClick={focus}>
        &zwnj;
        <span className={'strikethrough-able' + strikethroughClass}
              contentEditable={true}
              suppressContentEditableWarning={true}
              onClick={focus}
              onFocus={this.callFocusHandler}
              onBlur={this.callBlurHandler}
              onKeyDown={callKeyDownHandler}
              ref={ref}>
          {taskText}
        </span>
      </div>
    );
  }
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
    const {checkHandler} = this.props;
    const {focusHandler} = this.props;
    const {blurHandler} = this.props;
    const {upDownHandler} = this.props;

    const focusClass = focused ? ' focused' : '';

    return (
      <div className={'task-container' + focusClass}>
        <CheckBox id={id}
                  completed={completed}
                  checkHandler={checkHandler} />

        <TaskText id={id}
                  completed={completed}
                  focused={focused}
                  focusHandler={focusHandler}
                  blurHandler={blurHandler}
                  upDownHandler={upDownHandler}
                  taskText={taskText} />

        <TaskInfo />
      </div>
    );
  }
};

module.exports = Task;
