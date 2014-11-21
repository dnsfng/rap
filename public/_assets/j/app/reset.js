var is_playable = false;

$(document).ready(function(){

  // ———————————————————————————————————————————————————————
  // Repaint resize hack on vw unit (Safari)

  var causeRepaintsOn = $("section");

  $(window).resize(function() {
    causeRepaintsOn.css("z-index", 1);
  });


  // ———————————————————————————————————————————————————————
  // Carousel handler


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

    $('.carousel--reference').removeClass('is_out is_in is_first_in is_going_left is_going_right');

    if (direction === "next") {
      if (position < position_end) {
        $c_wrapper.attr('data-ref-current', position + 1);
        $('.carousel--reference-child-'+position).addClass('is_out is_going_right');
        $('.carousel--reference-child-'+(position+1)).addClass('is_in');
      } else {
        $c_wrapper.attr('data-ref-current', 1);
        $('.carousel--reference-child-'+position_end).addClass('is_out');
        $('.carousel--reference-child-1').addClass('is_in');
      }
    }

    if (direction === "prev") {
      if (position > 1) {
        $c_wrapper.attr('data-ref-current', position - 1);
        $('.carousel--reference-child-'+position).addClass('is_out is_going_left');
        $('.carousel--reference-child-'+(position-1)).addClass('is_in');
      } else {
        $c_wrapper.attr('data-ref-current', position_end);
        $('.carousel--reference-child-1').addClass('is_out');
        $('.carousel--reference-child-'+position_end).addClass('is_in');
      }
    }

  }

  function modalReference(status, index){

    index = index || '1';

    if(status === true) {

      window.setTimeout(function(){
        $('body').addClass('no-scroll');
      }, 1200);
      
      $_modal.addClass('is_visible');
      $c_wrapper.toggleClass('shutter-toggle');
      

      $('.carousel--reference-child-'+index).addClass('is_first_in');
      navigateCarousel(index);

    } else {

      $('body').removeClass('no-scroll');
      $_modal.removeClass('is_visible');
      $c_wrapper.toggleClass('shutter-toggle');
      window.location = "#references" ;
    }

  }

  
  // Binding and behavior

  $('.js--ref-test').click(function(e){
    e.preventDefault();
    var index = $(this).attr('data-ref-index');
    modalReference(true, index);
  });

  $('.js--modal-open').click(function(){
    modalReference(true);
  });

  $('.js--modal-close').click(function(){
    modalReference(false);
  });

  $('.js--carousel-nav').click(function(){

    // Update
    var currentPosition = +($c_wrapper.attr('data-ref-current')),
        direction = $(this).attr('data-ref-direction');

    updateCarouselPosition(direction, currentPosition, position_end);

    // Move
    var nextPosition = +($c_wrapper.attr('data-ref-current'));

    navigateCarousel(nextPosition);

  });

  // ———————————————————————————————————————————————————————
  // Conditional loader

  if(!Modernizr.mq('screen and (min-width : 1200px)')){

    $(window).resize(function() {
        if (Modernizr.mq('screen and (min-width : 1200px)') && is_playable === false){
          Modernizr.load(['/_assets/j/vendor/mediaCheck-min.js','/_assets/j/app/play.js']);
        }
    });
  }

});