const React = require('react');

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

function TaskText(props) {
  const {id} = props;
  const {focusHandler} = props;
  const {blurHandler} = props;
  const {completed} = props;
  const {taskText} = props;

  const focusDiv = (event) => {
    event.target.childNodes[3].focus();
  };
  const focusInput = (event) => {
    event.stopPropagation();
    event.target.focus();
  };

  const callFocusHandler = () => focusHandler(id);
  const callBlurHandler = () => blurHandler(id);

  const strikethroughClass = completed ? ' strikethrough' : '';

  // &zwnj is a zero-width non-joiner, it is needed to prevent the cursor from
  // behaving unexpectedly when taskText is the empty string.
  return (
    <div className="task-text" onClick={focusDiv}>
      &zwnj;
      <span className={'strikethrough-able' + strikethroughClass}
            contentEditable={true}
            suppressContentEditableWarning={true}
            onClick={focusInput}
            onFocus={callFocusHandler}
            onBlur={callBlurHandler}>
        {taskText}
      </span>
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

function Task(props) {
  const {taskText} = props;
  const {id} = props;
  const {completed} = props;
  const {focused} = props;
  const {checkHandler} = props;
  const {focusHandler} = props;
  const {blurHandler} = props;

  const focusClass = focused ? ' focused' : '';

  return (
    <div className={'task-container' + focusClass}>
      <CheckBox id={id}
                completed={completed}
                checkHandler={checkHandler} />

      <TaskText id={id}
                completed={completed}
                focusHandler={focusHandler}
                blurHandler={blurHandler}
                taskText={taskText} />

      <TaskInfo />
    </div>
  );
}

module.exports = Task;
