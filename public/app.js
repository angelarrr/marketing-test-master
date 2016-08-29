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
  showGuests(data);
  showRegMsg();
});

// show all registrants
function showGuests(data){
  $.each(data.guests, function(i, guest) {
      $(".registrants-list").append("<li><div class='order-bar'><i class='fa fa-bars' aria-hidden='true'></i></div> "
      + "<div class='guest-name'>" + guest.name + "</div>"
      + "<div class='guest-email' data-email='" + guest.email + "'>" + " (" + guest.email + ")</div>"
      + "<div class='remove'><span class='glyphicon glyphicon-remove'></span></div></li>");
  });
};

// add registrant
function addGuest(guest){
  $(".registrants-list").append("<li><div class='order-bar'><i class='fa fa-bars' aria-hidden='true'></i></div> "
  + "<div class='guest-name'>" + guest.name + "</div>"
  + "<div class='guest-email' data-email='" + guest.email + "'>" + " (" + guest.email + ")</div>"
  + "<div class='remove'><span class='glyphicon glyphicon-remove'></span></div></li>");
}

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
      addGuest(data);
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
