class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      indentationLevel: Number(this.props.indent)
    };
    this.toggle = () => {
      console.log('indent ' + this.state.indentationLevel);
      this.setState({checked: !this.state.checked});
    };
  }
  render() {
    const {checked} = this.state;
    const {indentationLevel} = this.state;

    if (indentationLevel > 0) {
      return (
        <div className="row task">
          <div className="large-1 column"></div>
          <div className="large-1 column">
            <input type="checkbox"
              checked={checked}
              onChange={this.toggle}
              className="task-checkbox"
            />
          </div>
          <div className="large-11 columns">
            <input type="text" className="task-text" />
          </div>
        </div>
      );
    }

    return (
      <div className="row task">
        <div className="large-1 column">
          <input type="checkbox"
            checked={checked}
            onChange={this.toggle}
            className="task-checkbox"
          />
        </div>
        <div className="large-11 columns">
          <input type="text" className="task-text" />
        </div>
      </div>
    );
  }
}

class Application extends React.Component {
  render() {
    return (
      <div>
        <Task indent="0" />
        <Task indent="1" />
      </div>
    );
  }
}

ReactDOM.render(
  <Application/>,
  document.getElementById('root')
);
