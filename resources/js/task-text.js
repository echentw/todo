const React = require('react');

const Component = React.Component;

const ui = require('./utils/ui');

class TaskText extends Component {
  constructor(props) {
    super(props);

    this.textInput = null;

    this.state = {
      id: props.id,
    };

    this.focusHandler = props.focusHandler;
    this.blurHandler = props.blurHandler;
    this.arrowKeyHandler = props.arrowKeyHandler;
    this.onChangeHandler = props.onChangeHandler;

    this.createTask = props.createTask;
    this.deleteTask = props.deleteTask;

    this.callFocusHandler = this.callFocusHandler.bind(this);
    this.callBlurHandler = this.callBlurHandler.bind(this);
    this.callOnChangeHandler = this.callOnChangeHandler.bind(this);
  }

  componentDidMount() {
    if (this.props.focused) {
      this.textInput.focus();
      ui.setCaretPosition(this.textInput, 0);
    }
  }

  componentDidUpdate() {
    if (this.props.focused) {
      this.textInput.focus();
    }
  }

  callFocusHandler() {
    if (this.props.focused) {
      if (this.props.caretPosition != null) {
        ui.setCaretPosition(this.textInput, this.props.caretPosition);
      } else {
        ui.placeCaretAtEnd(this.textInput);
      }
    } else {
      ui.placeCaretAtEnd(this.textInput);
    }
    this.focusHandler(this.state.id);
  }

  callBlurHandler() {
    this.blurHandler(this.state.id, this.textInput);
  }

  callOnChangeHandler() {
    this.onChangeHandler(this.state.id, this.textInput);
  }

  render() {
    const {id} = this.props;
    const {completed} = this.props;
    const {focused} = this.props;

    const {taskText} = this.props;

    const ref = (input) => this.textInput = input;
    const focus = () => this.textInput.focus();

    const callKeyDownHandler = (event) => {
      if (event.keyCode == 13) {
        // pressed enter
        event.preventDefault();
        this.createTask(id, event);
      } else if (event.keyCode == 8) {
        // pressed backspace
        if (ui.getCaretPosition(this.textInput) == 0) {
          event.preventDefault();
          this.deleteTask(id);
        }
      } else if (event.keyCode == 38 || event.keyCode == 40) {
        // pressed up or down
        event.preventDefault();
        this.arrowKeyHandler(id, event);
      } else if (event.keyCode == 37) {
        // pressed left
        if (ui.getCaretPosition(this.textInput) == 0) {
          event.preventDefault();
          this.arrowKeyHandler(id, event);
        }
      } else if (event.keyCode == 39) {
        // pressed right
        if (ui.getCaretPosition(this.textInput) == taskText.length) {
          event.preventDefault();
          this.arrowKeyHandler(id, event);
        }
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
              onInput={this.callOnChangeHandler}
              ref={ref}>
          {taskText}
        </span>
      </div>
    );
  }
}

module.exports = TaskText;
