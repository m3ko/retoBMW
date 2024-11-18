<<<<<<< HEAD
$(document).ready(function() {
  $('#log-in-button').on('click', function() {
    $('#log-in-button').addClass('active');
    $('#sign-up-button').removeClass('active');
    $('#sign-up-form').hide();
    $('#log-in-form').show();
  });

<<<<<<< HEAD
  $('#sign-up-button').on('click', function() {
    $('#sign-up-button').addClass('active');
    $('#log-in-button').removeClass('active');
    $('#log-in-form').hide();
    $('#sign-up-form').show();
  });
});
=======
    $('#log-in-button').on('click', function() {
      $('#log-in-button').addClass('active');
      $('#sign-up-button').removeClass('active');
      $('#sign-up-form').css('display', 'none');
      $('#log-in-form').css('display', 'block');
    });
  
    $('#sign-up-button').on('click', function() {
      $('#log-in-button').removeClass('active');
      $('#sign-up-button').addClass('active');
      $('#sign-up-form').css('display', 'block');
      $('#log-in-form').css('display', 'none');
    });
  })
=======
$(document).ready(function() {

    $('#log-in-button').on('click', function() {
      $('#log-in-button').addClass('active');
      $('#sign-up-button').removeClass('active');
      $('#sign-up-form').css('display', 'none');
      $('#log-in-form').css('display', 'block');
    });
  
    $('#sign-up-button').on('click', function() {
      $('#log-in-button').removeClass('active');
      $('#sign-up-button').addClass('active');
      $('#sign-up-form').css('display', 'block');
      $('#log-in-form').css('display', 'none');
    });
  })
>>>>>>> ian
  
>>>>>>> fe720a21c2aa736c1debab782217bbf3fb0c36f4
