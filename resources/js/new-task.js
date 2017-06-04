const React = require('react');

const Component = React.Component;

class NewTask extends Component {
  constructor(props) {
    super(props);
    this.createTask = props.createTask;

    this.clickHandler = this.clickHandler.bind(this);
    this.mouseEnterHandler = this.mouseEnterHandler.bind(this);
    this.mouseLeaveHandler = this.mouseLeaveHandler.bind(this);

    this.state = {focused: false};
  }

  clickHandler() {
    const id = this.props.tasklist[this.props.tasklist.length - 1].id;
    this.createTask(id, null);
    this.setState({focused: false});
  }

  mouseEnterHandler() {
    this.setState({focused: true});
  }

  mouseLeaveHandler() {
    this.setState({focused: false});
  }

  render() {
    const focusClass = this.state.focused ? ' focused' : '';

    return (
      <div className={'new-task-container' + focusClass}
           onClick={this.clickHandler}
           onMouseEnter={this.mouseEnterHandler}
           onMouseLeave={this.mouseLeaveHandler}>
        <div className="checkbox-container">
          <input type="checkbox"
                 className="checkbox"
                 checked={false}/>
          <label></label>
        </div>
        <div className="new-task-text">+ new task</div>
      </div>
    );
  }
};

module.exports = NewTask;
