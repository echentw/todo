const React = require('react');

const Component = React.Component;

const TaskList = require('./tasklist');

const TASKLIST_NAME = 'Tasklist 1';
const TASKS = [
  {'id': 'bbba', 'completed': false, 'text': 'milk the cow for top quality milk'},
  {'id': 'bbbb', 'completed': true, 'text': 'visit chicken farm and acquire super large egg'},
  {'id': 'bbbc', 'completed': false, 'text': 'get extra fine flour from Mill Lane Mill'},
  {'id': 'bbbd', 'completed': false, 'text': ''},
  {'id': 'bbbe', 'completed': true, 'text': 'checkbox animation'},
  {'id': 'bbbj', 'completed': true, 'text': 'strikethrough animation'},
  {'id': 'bbbf', 'completed': false, 'text': 'choose a better font'},
  {'id': 'bbbg', 'completed': false, 'text': 'make the colors look better'},
  {'id': 'bbbh', 'completed': false, 'text': 'make subtasks work'},
  {'id': 'bbbi', 'completed': false, 'text': 'more info right sidebar?'},
  {'id': 'bbbk', 'completed': false, 'text': 'turn animations off for initial render'},
  {'id': 'bbbl', 'completed': true, 'text': 'get rid of blue highlighting when focusing'},
  {'id': 'bbbm', 'completed': false, 'text': 'think of something cool to build with stella'},
];

class Application extends Component {
  render() {
    return (
      <TaskList tasks={TASKS} name={TASKLIST_NAME} />
    );
  }
}

module.exports = Application;
