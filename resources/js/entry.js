$(document).ready(() => {
  // $(document).foundation();

  $('.new-task-container').hover(() => {
    $('.shine').addClass('start');
  }, () => {
    $('.shine').removeClass('start');
  });
});
