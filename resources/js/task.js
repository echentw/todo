const React = require('react');

function CheckBox(props) {
  const toggle = props.toggle;
  const checked = props.checked;

  let imagePath;
  if (checked) {
    imagePath = '/img/check.png';
  } else {
    imagePath = '/img/square.svg';
  }

  return (
    <img className="checkbox" onClick={toggle} src={imagePath}/>
  );
}

function Task(props) {
  const {checked} = props;
  const {value} = props;
  const {toggle} = props;
  const {id} = props;
  return (
    <div className="task-container">
      <CheckBox id={id} checked={checked} toggle={toggle}/>
      <input type="text" className="task-text" value={value}/>
    </div>
  );
}

module.exports = Task;
