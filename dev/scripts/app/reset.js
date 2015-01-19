// ——————————————————————————————————————————————————————————————————
// Avoid `console` errors in browsers that lack a console.

(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());




// ——————————————————————————————————————————————————————————————————
// Variables

var $_modal               = $('.modal'),
      $c_wrapper            = $('.carousel--wrapper'),
      $c_translate          = $('.carousel--translate'),
      $c_flap               = $('.carousel--flap'),
      position_end          = +($c_wrapper.attr('data-ref-total')),
      $offsetSectionTitle   = ["0"],
      $offsetSection        = [],
      myInterval;





// ——————————————————————————————————————————————————————————————————
// Let's reset

$(document).ready(function(){


  function init(){

    // Later, if resized to small screen size
    $(window).resize(function() {
      if (Modernizr.mq('screen and (max-width : 1199px)') ) {
        $(window).resize(debounce(setScrollOffset));
        $(window).scroll(iconToggle_Manager);

        $(".logoSymbol--wrapper").off("click");
      }
    });

    // Later, if resized to large screen size
    $(window).resize(function() {
      if (Modernizr.mq('screen and (min-width : 1200px)') ) {
        $(window).off("resize", debounce);
        $(window).off("scroll", iconToggle_Manager);

        $(".logoSymbol--wrapper").show().css("opacity", 0);
        $(".logo--icon").show();

        Modernizr.load(['/_assets/j/app/play.js']);        
      }
    });

  }


  // ———————————————————————————————————————————————————————
  // Carousel handler


  // Config
  function navigateCarousel(position) {

    position = position || '1';

    window.setTimeout(function(){
        $c_translate.scrollTop(0);
      }, 600);

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


  // Remove all animation helpers when hiding modal.
  function removeHelpers(){
    $('.carousel--reference').removeClass('is_out is_in is_first_in is_going_left is_going_right is_looping_left is_looping_right');
  }


  function updateCarouselPosition(direction, position, position_end){

    removeHelpers();

    if (direction === "next") {
      if (position < position_end) {
        $c_wrapper.attr('data-ref-current', position + 1);
        $('.carousel--reference-child-'+position).addClass('is_out is_going_right');
        $('.carousel--reference-child-'+(position+1)).addClass('is_in');
      } else {
        $c_wrapper.attr('data-ref-current', 1);
        $('.carousel--reference-child-'+position_end).addClass('is_out is_looping_right');
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
        $('.carousel--reference-child-1').addClass('is_out is_looping_left');
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
      
      $_modal.show(0,function(){
      // modal is display as block first, than animated (opacity and shutter system).
      // this was originaly a IE10 debug but it doesn't seem to slow other browser down anyway.
        $_modal.addClass('is_visible');
        $c_wrapper.toggleClass('is_closed');
        $c_wrapper.attr('data-ref-current', index);
        console.log("ok");
      });
      

      $('.carousel--reference-child-'+index).addClass('is_first_in');
      navigateCarousel(index);

    } else {

      $('body').removeClass('no-scroll');
      $_modal.removeClass('is_visible');
      $c_wrapper.toggleClass('is_closed');
      window.location = "#references" ;

      $('.carousel--flap').on("transitionend webkitTransitionEnd oTransitionEnd", function(){
      // modal is hidden after all transitions end.

        if (!$_modal.hasClass('is_visible')){
          $c_flap.css('background-color', 'transparent');
          $c_translate.scrollTop(0); // Reset scroll position to 0
          $_modal.hide();
        }
      });
      
    }

  }


  function debounce(myFunction){
    clearTimeout(myInterval);
    myInterval = setTimeout(myFunction, 400);
  }




  // ———————————————————————————————————————————————————————
  // Icon toggling manager (below animated version of website)

  function setScrollOffset(){

    $(".section--title--wrapper").each(function(index){
      var offset = $(this).offset().top.toFixed(0);
      $offsetSectionTitle[index+1] = offset;
    });

    $("section").each(function(index){
      var offset = $(this).offset().top.toFixed(0);
      $offsetSection[index] = offset;
    });

  }


  function iconToggle_Manager(){

    var height = $(window).scrollTop(),
        lastSection = $offsetSectionTitle.length - 1;

    if (height >= $offsetSection[1]){
      $(".logoSymbol--wrapper").fadeIn();
    } else {
      $(".logoSymbol--wrapper").fadeOut();
    }

    if (height <= $offsetSection[lastSection] || height <= $offsetSectionTitle[lastSection]){

      for(var i = 0; i <= lastSection; i++){

        // Manage Mail Icon visibility
        if( height >= $offsetSectionTitle[i] && height < $offsetSectionTitle[i+1]){
          
          if($("section").eq(i).hasClass("even")){
            $(".mail--icon-black").fadeIn();
          } else {
            $(".mail--icon-black").fadeOut();
          }

        }

        // Manage Small Logo visibility
        if( $offsetSection[i] <= height && height < $offsetSection[i+1]){          

          if($("section").eq(i).hasClass("even")){
            $(".logo--icon-white").fadeOut();
          } else {
            $(".logo--icon-white").fadeIn();
          }
        }
      } 

    }

    if (height > $offsetSection[lastSection]){

      if($("section").last().hasClass("even")){
        $(".logo--icon-white").fadeOut();
      } else {
        $(".logo--icon-white").fadeIn();
      }

    }

    if(height > $offsetSectionTitle[lastSection]){

      if($("section").last().hasClass("even")){
        $(".mail--icon-black").fadeIn();
      } else {
        $(".mail--icon-black").fadeOut();
      }

    }

  }
    

  
  // ———————————————————————————————————————————————————————
  // Binding and behavior


  $('.js--modal-start').click(function(e){
    e.preventDefault();
    var index = $(this).attr('data-ref-index');
    removeHelpers();
    modalReference(true, index);
  });

  // Debuging helper.
  $('.js--modal-open').click(function(){
    removeHelpers();
    modalReference(true);
  });


  $('.js--modal-close').click(function(){
    removeHelpers();
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




  // ——————————————————————————————————————————————————————————————————
  // Conditional loader


  if(Modernizr.mq('screen and (max-width : 1199px)')){
    // If screen is below 1199px wide

    // init resize and scroll event
    $(window).resize(debounce(setScrollOffset));
    $(window).scroll(iconToggle_Manager);

  }

  if(Modernizr.mq('screen and (min-width : 1200px)')){
    // If screen is above 1200px wide

    $(".logoSymbol--wrapper").show().css("opacity", 0);
    $(".logo--icon").show();

  }

  


  init();

});