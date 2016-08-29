// drag and drop functionality
$("#sortable").sortable({
  revert: true,
  cursor: "move"
});
$("#sortable").disableSelection();

// show there are no registrants msg
function showRegMsg(){
  if ($('.registrants-list').find('li').length === 0){
    $('.registrant-msg').show();
  } else {
    $('.registrant-msg').hide();
  }
};

// list out all registrants on page load
$.ajax({
  url:'/',
  dataType: 'json',
  method: 'GET'
}).done(function(data){
  $("#guestListTmp").tmpl(data.guests).appendTo(".registrants-list");
  showRegMsg();
});

// show status msg
function showStatus(msg){
  $('.msg-center').show();
  $('.status-msg').html(msg);
};

// form submit new registrant
$('form').on('submit', function(e){
  e.preventDefault();
  var data = {};

  // get data from form
  data.name = $('#username').val();
  data.email = $('#email').val();

  $.ajax({
    url: '/',
    type: 'POST',
    data: data,
    success: function(msg){
      $('.registrant-msg').hide();
      // show registered message
      showStatus(msg);
      // show in registrants box
      $("#guestListTmp").tmpl(data).appendTo(".registrants-list");
      // clear input values
      $('#username').val("");
      $('#email').val("");
    }
  });
})

// delete registrants
$(document).on('click', '.remove', function(){
  var email = $(this).prev('div').data('email');
  var guestInfo = $(this).closest('li');

  $.ajax({
    url: '/' + email,
    type: 'DELETE',
    data: email,
    success: function(msg){
      showStatus(msg);
      guestInfo.remove();
      showRegMsg();
    }
  });
})

// close status msg box
function closeMe(){
  $('.message').hide();
}
