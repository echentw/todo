const React = require('react');
const _ = require('lodash');

const ui = require('./utils/ui');

const IdGen = require('./utils/id-gen');
const idGen = new IdGen();

const Component = React.Component;

const Task = require('./task');
const NewTask = require('./new-task');

function TaskListName(props) {
  const {name} = props;
  return (
    <div className="tasklist-name-container">
      <div contentEditable={true}
           className="tasklist-name"
           suppressContentEditableWarning={true}>
        {name}
      </div>
    </div>
  );
}

class TaskList extends Component {
  constructor(props) {
    super(props);

    const {name} = props;
    const {tasks} = props;

    // Give a unique id to each task
    for (let i = 0; i < tasks.length; ++i) {
      tasks[i].id = idGen.get();
    }

    this.state = {
      name: name,
      tasks: tasks,
      focus: null,
      caretPosition: null,
    };

    this.checkHandler = this.checkHandler.bind(this);
    this.focusHandler = this.focusHandler.bind(this);
    this.blurHandler = this.blurHandler.bind(this);
    this.arrowKeyHandler = this.arrowKeyHandler.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);

    this.createTask = this.createTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  shouldComponentUpdate(newProps, newState) {
    if (this.state.focus != newState.focus) {
      return true;
    }
    for (let i = 0; i < this.state.tasks.length; ++i) {
      if (this.state.tasks[i].completed != newState.tasks[i].completed) {
        return true;
      }
    }
    return false;
  }

  checkHandler(event) {
    const id = event.target.getAttribute('id');
    const index = _.findIndex(this.state.tasks, {'id': id});

    const tasks = this.state.tasks.slice();
    tasks[index] = {
      'id': tasks[index].id,
      'completed': !tasks[index].completed,
      'text': tasks[index].text,
    };

    this.setState({
      tasks: tasks,
      caretPosition: null,
    });
  }

  focusHandler(id) {
    this.setState({
      focus: id,
      caretPosition: null,
    });
  }

  blurHandler(id, elem) {
    if (id == this.state.focus) {
      this.setState({
        focus: null,
        caretPosition: null,
      });
    }
  }

  arrowKeyHandler(id, event) {
    const index = _.findIndex(this.state.tasks, {'id': id});
    if (event.keyCode == 38) {
      // pressed up
      if (index > 0) {
        this.setState({
          focus: this.state.tasks[index - 1].id,
          caretPosition: null,
        });
      }
    } else if (event.keyCode == 40) {
      // pressed down
      if (index < this.state.tasks.length - 1) {
        this.setState({
          focus: this.state.tasks[index + 1].id,
          caretPosition: null,
        });
      }
    } else if (event.keyCode == 37) {
      // pressed left
      if (index > 0) {
        this.setState({
          focus: this.state.tasks[index - 1].id,
          caretPosition: this.state.tasks[index - 1].text.length,
        });
      }
    } else if (event.keyCode == 39) {
      // pressed right
      if (index < this.state.tasks.length - 1) {
        this.setState({
          focus: this.state.tasks[index + 1].id,
          caretPosition: 0,
        });
      }
    }
  }

  onChangeHandler(id, elem) {
    const tasks = this.state.tasks.slice();
    const index = _.findIndex(this.state.tasks, {'id': id});

    tasks[index] = {
      'id': tasks[index].id,
      'completed': tasks[index].completed,
      'text': elem.innerHTML,
    };

    this.setState({
      tasks: tasks,
      caretPosition: null,
    });
  }

  createTask(id, event) {
    const index = _.findIndex(this.state.tasks, {'id': id});
    const tasks = this.state.tasks.slice();

    const taskText = tasks[index].text;
    const caretPosition = event ? ui.getCaretPosition(event.target) : taskText.length;
    tasks[index].text = taskText.substring(0, caretPosition);

    let oldCompleted = tasks[index].completed;
    let newCompleted = false;
    if (tasks[index].completed && caretPosition == 0) {
      // pressing enter with the caret at the beginning of a completed task
      oldCompleted = false;
      newCompleted = true;
    }

    tasks[index] = {
      'id': tasks[index].id,
      'completed': oldCompleted,
      'text': taskText.substring(0, caretPosition),
    };

    const newId = idGen.get();
    tasks.splice(index + 1, 0, {
      'id': newId,
      'completed': newCompleted,
      'text': taskText.substring(caretPosition, taskText.length),
    });

    this.setState({
      tasks: tasks,
      focus: newId,
      caretPosition: null,
    });
  }

  deleteTask(id) {
    // We always want there to be at least one task
    if (this.state.tasks.length == 1) {
      return;
    }

    const index = _.findIndex(this.state.tasks, {'id': id});

    // Do nothing if pressing backspace at the beginning of the first task
    if (index == 0 && this.state.tasks[index].text.length > 0) {
      return;
    }

    const tasks = this.state.tasks.slice();
    const task = tasks[index];

    tasks.splice(index, 1);

    const newIndex = (index == 0) ? 0 : index - 1;
    const newId = tasks[newIndex].id;
    const newCaretPosition = tasks[newIndex].text.length;

    let newCompleted = tasks[newIndex].completed;
    if (newCaretPosition == 0) {
      // caret will end up at the beginning, meaning we want to preserve whether
      // the current task has been completed or not
      newCompleted = task.completed;
    }

    tasks[newIndex] = {
      'id': tasks[newIndex].id,
      'completed': newCompleted,
      'text': tasks[newIndex].text + task.text,
    };

    this.setState({
      tasks: tasks,
      focus: newId,
      caretPosition: newCaretPosition,
    });
  }

  render() {
    const tasks = this.state.tasks.map((task) => {
      const focused = (this.state.focus == task.id);
      return <Task key={task.id}
                   taskText={task.text}
                   id={task.id}
                   focused={focused}
                   completed={task.completed}
                   caretPosition={this.state.caretPosition}
                   checkHandler={this.checkHandler}
                   focusHandler={this.focusHandler}
                   blurHandler={this.blurHandler}
                   arrowKeyHandler={this.arrowKeyHandler}
                   onChangeHandler={this.onChangeHandler}
                   createTask={this.createTask}
                   deleteTask={this.deleteTask}
             />
    });
    return (
      <div className="tasklist-container">
        <TaskListName name={this.state.name} />
        <div className="tasks-container">
          {tasks}
          <NewTask tasklist={this.state.tasks}
                   createTask={this.createTask}
          />
        </div>
      </div>
    );
  }
}

module.exports = TaskList;
