// $( function() {
//   $( "#datepicker" ).datepicker();
// } );

$(document).ready(function() {
  $('.datepicker').datepicker();
})

$('#createProject').click(function(e){
  e.preventDefault()
  alert('Project created');
  $('input').val('')
})