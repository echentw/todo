const React = require('react');
const ReactDOM = require('react-dom');

const Component = React.Component;

const TASKLIST_NAMES = [
  {'id': 'aaaa', 'name': 'Tasklist 1'},
  {'id': 'aaab', 'name': 'Tasklist 2'},
  {'id': 'aaac', 'name': 'Tasklist 3'},
  {'id': 'aaad', 'name': 'Tasklist 4'},
  {'id': 'aaae', 'name': 'Tasklist 5'},
  {'id': 'aaaf', 'name': 'Tasklist 6'},
  {'id': 'aaag', 'name': 'Tasklist 7'},
  {'id': 'aaah', 'name': 'Tasklist 8'},
  {'id': 'aaai', 'name': 'Tasklist 9'},
  {'id': 'aaaj', 'name': 'Tasklist 10'},
  {'id': 'aaak', 'name': 'Tasklist 11'},
  {'id': 'aaal', 'name': 'Tasklist 12'},
  {'id': 'aaam', 'name': 'Tasklist 13'},
  {'id': 'aaan', 'name': 'Tasklist 14'},
  {'id': 'aaao', 'name': 'Tasklist 15'},
  {'id': 'aaap', 'name': 'Tasklist 16'},
  {'id': 'aaaq', 'name': 'Tasklist 17'},
  {'id': 'aaar', 'name': 'Tasklist 18'},
];

function ListName(props) {
  const {name} = props;
  return (
    <div className="tasklist-container">
      <div className="tasklist-name">{name}</div>
      <i className="shine"></i>
    </div>
  );
}

class ListNamesList extends Component {
  constructor(props) {
    super(props);

    const {listNames} = props;

    this.state = {
      listNames: listNames,
    };
  }

  render() {
    const listNames = this.state.listNames.map((listName) => {
      return <ListName key={listName.id} name={listName.name} />
    });
    return (
      <div className="tasklists-container">
        {listNames}
      </div>
    );
  }
}

class Application extends Component {
  render() {
    return (
      <ListNamesList listNames={TASKLIST_NAMES} />
    );
  }
}

ReactDOM.render(<Application/>, document.getElementById('tasklist-names'));
