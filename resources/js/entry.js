$(document).ready(() => {
  $('.new-task-container').mouseenter((event) => {
    $(event.target).children('.shine').addClass('start');
    setTimeout(() => {
      $(event.target).children('.shine').removeClass('start');
    }, 700);
  });

  $('.tasklist-container').mouseenter((event) => {
    $(event.target).parent().children('.shine').addClass('start');
    setTimeout(() => {
      $(event.target).parent().children('.shine').removeClass('start');
    }, 700);
  });
});
