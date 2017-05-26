const React = require('react');

const Component = React.Component;

const TaskList = require('./tasklist');

const TASKLIST_NAME = 'Tasklist 1';
const TASKS = [
  {'completed': false, 'text': 'milk the cow for top quality milk'},
  {'completed': true, 'text': 'visit chicken farm and acquire super large egg'},
  {'completed': false, 'text': 'get extra fine flour from Mill Lane Mill'},
  {'completed': false, 'text': ''},
  {'completed': true, 'text': 'create new task'},
  {'completed': true, 'text': 'delete task'},
  {'completed': false, 'text': 'new task when pressing enter in the middle of task text'},
  {'completed': false, 'text': 'overflow problem for task list'},
  {'completed': false, 'text': 'choose a better font'},
  {'completed': false, 'text': 'make the colors look better'},
  {'completed': false, 'text': 'make subtasks work'},
  {'completed': false, 'text': 'more info right sidebar?'},
  {'completed': false, 'text': 'turn animations off for initial render'},
  {'completed': false, 'text': 'think of something cool to build with stella'},
];

class Application extends Component {
  render() {
    return (
      <TaskList tasks={TASKS} name={TASKLIST_NAME} />
    );
  }
}

module.exports = Application;
