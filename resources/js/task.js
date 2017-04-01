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

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      indentationLevel: Number(this.props.indent)
    };
    this.toggle = () => {
      this.setState({checked: !this.state.checked});
    };
  }
  render() {
    const {checked} = this.state;

    return (
      <div className="task-container">
        <CheckBox toggle={this.toggle} checked={checked}/>
        <input type="text" className="task-text"/>
      </div>
    );
  }
}

module.exports = Task;
