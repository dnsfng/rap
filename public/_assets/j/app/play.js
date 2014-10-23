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


  // Repaint resize hack on vw unit (Safari)

  var causeRepaintsOn = $("section");

  $(window).resize(function() {
    causeRepaintsOn.css("z-index", 1);
  });

  // Found a css solution
  // $('.js--ref--item').hover(function(){
  //     console.log('ok');
  //     $(this).children('a').css({'background-color': 'yellow'});
  // });

});