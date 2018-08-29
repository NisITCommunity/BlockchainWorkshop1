var web3 = new Web3(Web3.givenProvider || 'ws://localhost:7546');

$(document).ready(function() {
  $('.nav .nav-link').removeClass('active')
  $('#' + $('#navigation').attr('active')).addClass('active')
})

$('#refreshProjectsList').click(function(e){
  e.preventDefault()
  alert('Refresh called. Please wait...')
})