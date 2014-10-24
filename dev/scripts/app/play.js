$(document).ready(function(){

  // ———————————————————————————————————————————————————————
  // Repaint resize hack on vw unit (Safari)

  var causeRepaintsOn = $("section");

  $(window).resize(function() {
    causeRepaintsOn.css("z-index", 1);
  });

  // ———————————————————————————————————————————————————————

  // function getReference() {
  //   var request = $.ajax({
  //     url: "projets/ubisoft",
  //     type: "GET",      
  //     dataType: "html"
  //   });

  //   request.done(function(d) {
  //     console.log(d);
  //     $('.modal article').html(d); 
  //   });

  //   request.fail(function(jqXHR, textStatus) {
  //     alert( "Request failed: " + textStatus );
  //   });
  // }

  //$('.js--modal-open').click(getReference);


  // ———————————————————————————————————————————————————————
  // CAROUSEL NAVIGATION


  // Config

  var $_modal       = $('.modal'),
      $c_wrapper    = $('.carousel--wrapper'),
      $c_translate  = $('.carousel--translate'),
      $c_flap       = $('.carousel--flap'),
      position_end  = +($c_wrapper.attr('data-ref-total'));


  // Functions

  function navigateCarousel(position) {

    position = position || '1';

    $c_translate.css('transform', function(){
      // Can't use vw because of iOS 7 support, can't fix it with buggyfill
      //return 'translate3d(-'+ (position - 1) * 100 +'vw,0,0)';
      return 'translate3d(-'+ ((position - 1) * (100/position_end)).toFixed(3) +'%,0,0)';
    });

    $c_flap.css('background-color', function(){
      var $child = $('.carousel--reference-child-'+position),
          color = $child.attr('data-ref-bgColor');
      return color;
    });
  }

  function updateCarouselPosition(direction, position, position_end){

    if (direction === "next") {
      if (position < position_end) {
        $c_wrapper.attr('data-ref-current', position + 1);
      } else {
        $c_wrapper.attr('data-ref-current', 1);
      }
    }

    if (direction === "prev") {
      if (position > 0) {
        $c_wrapper.attr('data-ref-current', position - 1);
      } else {
        $c_wrapper.attr('data-ref-current', position_end);
      }
    }

  }

  function modalReference(status, index){

    index = index || '1';

    if(status === true) {

      window.setTimeout(function(){
        $('body').addClass('no-scroll');
      }, 1200);
      
      $_modal.addClass('is-visible');
      $c_wrapper.toggleClass('shutter-toggle');
      
      navigateCarousel(index);

    } else {

      $('body').removeClass('no-scroll');
      $_modal.removeClass('is-visible');
      $c_wrapper.toggleClass('shutter-toggle');
      window.location = "#references" ;
    }

  }

  $('.js--ref-test').click(function(e){
    e.preventDefault();
    var index = $(this).attr('data-ref-index');
    modalReference(true, index);
  });

  // Binding and behavior
  $('.js--modal-open').click(function(){
    modalReference(true);
  });

  $('.js--modal-close').click(function(){
    modalReference(false);
  });

  $('.js--carousel-nav').click(function(){

    var currentPosition = +($c_wrapper.attr('data-ref-current')),
        direction = $(this).attr('data-ref-direction');

    updateCarouselPosition(direction, currentPosition, position_end);

    var nextPosition = +($c_wrapper.attr('data-ref-current'));
    navigateCarousel(nextPosition);

  });

});