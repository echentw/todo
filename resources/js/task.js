const React = require('react');

function CheckBox(props) {
  const {toggle} = props;
  const {checked} = props;

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
  const {id} = props;
  const {toggle} = props;
  const {handleChange} = props;
  return (
    <div id={id} className="task-container">
      <CheckBox checked={checked} toggle={toggle}/>
      <input type="text" className="task-text" value={value} onChange={handleChange}/>
    </div>
  );
}

module.exports = Task;
