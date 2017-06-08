const React = require('react');

const Component = React.Component;

const Tasklist = require('./tasklist');
const IdGen = require('./utils/id-gen');

// const idGen = new IdGen('task', 0);

const TASKLIST_NAME = 'Tasklist 1';

// const id1 = idGen.get();
// const id2 = idGen.get();
// const id3 = idGen.get();
// const id4 = idGen.get();
// const id5 = idGen.get();

// const TASKS = [
//   {
//     'id': id1,
//     'completed': false,
//     'text': 'keep track of caret in tasks (when pressing up/down)',
//     'parent': null,
//     'children': [],
//   }, {
//     'id': id2,
//     'completed': false,
//     'text': 'overflow problems',
//     'parent': null,
//     'children': [
//       {
//         'id': id3,
//         'completed': true,
//         'text': 'overflow problem for task list (vertical)',
//         'parent': id2,
//         'children': [],
//       }, {
//         'id': id4,
//         'completed': true,
//         'text': 'overflow problem for long task (horizontal)',
//         'parent': id2,
//         'children': [],
//       },
//     ],
//   }, {
//     'id': id5,
//     'completed': false,
//     'text': 'choose a better font',
//     'parent': null,
//     'children': [],
//   },
// ];

const TASKS = [
  {'completed': false, 'text': 'keep track of caret in tasks (when pressing up/down)'},
  {'completed': true, 'text': 'overflow problem for task list (vertical)'},
  {'completed': true, 'text': 'overflow problem for long task (horizontal)'},
  {'completed': true, 'text': 'press enter at beginning of task text'},
  {'completed': false, 'text': 'minor bug: strikethrough not long enough for long task texts'},
  {'completed': false, 'text': 'choose a better font'},
  {'completed': false, 'text': 'make the colors look better'},
  {'completed': false, 'text': 'make subtasks work'},
  {'completed': false, 'text': 'more info right sidebar?'},
  {'completed': false, 'text': 'turn animations off for initial render'},
];

class Application extends Component {
  render() {
    return (
      <Tasklist tasks={TASKS} name={TASKLIST_NAME} />
    );
  }
}

module.exports = Application;
