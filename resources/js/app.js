class Checkbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false
    };

    this.toggle = () => {
      this.setState({isChecked: !isChecked});
    };
  }

  render() {
    const {label} = this.props;
    const {isChecked} = this.state;

    return (
      <div className="checkbox">
        <label>
          <input
            type="checkbox"
            value={label}
            checked={isChecked}
            onChange={this.toggle}
          />
          {label}
        </label>
      </div>
    );
  }
}

class Application extends React.Component {
  render() {
    return <Checkbox label="this is the label"/>
  }
}

ReactDOM.render(
  <Application/>,
  document.getElementById('root')
);
