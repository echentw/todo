const React = require('react');

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

module.exports = Task;
