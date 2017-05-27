const React = require('react');

const Component = React.Component;

const TaskList = require('./tasklist');

const TASKLIST_NAME = 'Tasklist 1';
const TASKS = [
  {'completed': true, 'text': 'create new task'},
  {'completed': true, 'text': 'delete task'},
  {'completed': false, 'text': 'keep track of caret in tasks (when pressing up/down)'},
  {'completed': true, 'text': 'create new task when pressing enter in the middle of task text'},
  {'completed': false, 'text': 'backspace at the beginning of a task text'},
  {'completed': false, 'text': 'string escaping bug'},
  {'completed': false, 'text': 'overflow problem for task list (vertical)'},
  {'completed': false, 'text': 'overflow problem for long task (horizontal)'},
  {'completed': false, 'text': 'choose a better font'},
  {'completed': false, 'text': 'make the colors look better'},
  {'completed': false, 'text': 'make subtasks work'},
  {'completed': false, 'text': 'more info right sidebar?'},
  {'completed': false, 'text': 'turn animations off for initial render'},
];

class Application extends Component {
  render() {
    return (
      <TaskList tasks={TASKS} name={TASKLIST_NAME} />
    );
  }
}

module.exports = Application;
