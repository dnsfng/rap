$(document).ready(function(){

  // ———————————————————————————————————————————————————————
  // Repaint resize hack on vw unit (Safari)

  var causeRepaintsOn = $("section");

  $(window).resize(function() {
    causeRepaintsOn.css("z-index", 1);
  });

  // ———————————————————————————————————————————————————————

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



  // ———————————————————————————————————————————————————————
  // CAROUSEL NAVIGATION


  // Config

  var carousel    = $('.carousel--wrapper'),
      position_end = +(carousel.attr('data-ref-total'));


  // Functions

  function navigateCarousel(position) {
    $('.carousel--translate').css('transform', function(){
      // Can't use vw because of iOS 7 support, can't fix it with buggyfill
      //return 'translate3d(-'+ (position - 1) * 100 +'vw,0,0)';
      return 'translate3d(-'+ ((position - 1) * (100/position_end)).toFixed(3) +'%,0,0)';
    });
  }

  function updateCarouselPosition(direction, position, position_end){

    if (direction === "next") {
      if (position < position_end) {
        carousel.attr('data-ref-current', position + 1);
      } else {
        carousel.attr('data-ref-current', 1);
      }
    }

    if (direction === "prev") {
      if (position > 0) {
        carousel.attr('data-ref-current', position - 1);
      } else {
        carousel.attr('data-ref-current', position_end);
      }
    }

  }


  // Binding and behavior

  $('.js--carousel-nav').click(function(){

    var currentPosition = +(carousel.attr('data-ref-current')),
        direction = $(this).attr('data-ref-direction');

    updateCarouselPosition(direction, currentPosition, position_end);

    var nextPosition = +(carousel.attr('data-ref-current'));
    navigateCarousel(nextPosition);

  });

});