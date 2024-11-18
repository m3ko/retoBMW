$(document).ready(function() {
  $('#log-in-button').on('click', function() {
    $('#log-in-button').addClass('active');
    $('#sign-up-button').removeClass('active');
    $('#sign-up-form').hide();
    $('#log-in-form').show();
  });

  $('#sign-up-button').on('click', function() {
    $('#sign-up-button').addClass('active');
    $('#log-in-button').removeClass('active');
    $('#log-in-form').hide();
    $('#sign-up-form').show();
  });
});