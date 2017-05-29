const React = require('react');
const ReactDOM = require('react-dom');

const Application = require('./app');

$(document).ready(() => {
  require('./sidebar');
  ReactDOM.render(<Application/>, document.getElementById('tasks'));

  $('.new-task-container').mouseenter((event) => {
    $(event.target).children('.shine').addClass('start');
    setTimeout(() => {
      $(event.target).children('.shine').removeClass('start');
    }, 700);
  });

  $('.tasklist-name-container').mouseenter((event) => {
    $(event.target).parent().children('.shine').addClass('start');
    setTimeout(() => {
      $(event.target).parent().children('.shine').removeClass('start');
    }, 700);
  });
});
