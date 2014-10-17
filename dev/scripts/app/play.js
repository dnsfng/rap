$(document).ready(function(){

  function getReference() {
    var request = $.ajax({
      url: "projets/ubisoft",
      type: "GET",      
      dataType: "html"
    });

    request.done(function(d) {
      console.log(d);
      $('.modal article').html(d); 
    });

    request.fail(function(jqXHR, textStatus) {
      alert( "Request failed: " + textStatus );
    });
  }

  // function navigateReference(e, direction){
  //   e.target.preventDefault()
  // }

  $('.js--open-modal').click(getReference);

});