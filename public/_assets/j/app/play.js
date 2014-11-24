mediaCheck({
  media: '(min-width: 1200px)',
  entry: function() {
    if( !$('body').hasClass('template--references')) {
      animateStart('start');
    }
  },
  exit: function() {
    if( !$('body').hasClass('template--references')) {
      animateStart('stop');
    }
  }
});

function animateStart(action) {

    /*  Globals
    -------------------------------------------------- */

    var shutterTranslateX       = '-100%',
        shutterNERotate         = [65,44],
        shutterSWRotate         = [-65,-44];

    var next_shutterTranslateX  = ['100%','0%'],
        next_shutterNEFixed     = [65,65],
        next_shutterSWFixed     = [-65,-65];

    var next_contentOpacity     = [-3, 1],
        dGrid_contentOpacity    = [-20, 1]

    var prev_contentOpacity     = [1, -6],
        prev_titleTranslateX    = '-10%',
        prev_descTranslateX     = '10%'


    var PROPERTIES =               ['translateX', 'translateY', 'opacity', 'rotate', 'scale'],
        $window =                  $(window),
        $body =                    $('body'),
        $shutter =                 $('.mainShutter'),
        $next =                    $('.nextSection--navigation'),
        wrappers =                 [],
        currentWrapper =           null,
        scrollIntervalID =         0,
        bodyHeight =               0,
        windowHeight =             0,
        windowWidth =              0,
        prevKeyframesDurations =   0,
        $scrollTop =               0,
        relativeScrollTop =        0,
        anchor =                   1,
        anchorTotal =              0,
        isAnimating =              false,
        currentKeyframe =          0,
        keyframes = [
        { // ————————————————————————————————————————  SHUTTER 00
          'wrapper'       : 'main',
          'target'        : '.section--00',
          'anchor'        : 1,
          'duration'      : '100%',
          'animations'    : [
            {
              'selector'  : '.mainShutter_00 .shutter_ne .flap',
              'translateX': shutterTranslateX,
              'rotate'    : shutterNERotate
            } , {
              'selector'  : '.mainShutter_00 .shutter_sw .flap',
              'translateX': shutterTranslateX,
              'rotate'    : shutterSWRotate
            } , {
              'selector'  : '.mainShutter_01 .shutter_ne .flap',
              'translateX': next_shutterTranslateX,
              'rotate'    : next_shutterNEFixed
            } , {
              'selector'  : '.mainShutter_01 .shutter_sw .flap',
              'translateX': next_shutterTranslateX,
              'rotate'    : next_shutterSWFixed
            } , {
              'selector'  : '.section--01 .section--title--wrapper',
              'opacity'   : next_contentOpacity 
            } , {
              'selector'  : '.section--01 .section--description',
              'opacity'   : next_contentOpacity 
            } 
          ]
        } , { // —————————————————————————————————————  SHUTTER 01
          'wrapper'       : 'main',
          'target'        : '.section--01',
          'anchor'        : 2,
          'duration'      : '100%',
          'animations'    : [
            {
              'selector'  : '.mainShutter_01 .shutter_ne .flap',
              'translateX': shutterTranslateX,
              'rotate'    : shutterNERotate
            } , {
              'selector'  : '.mainShutter_01 .shutter_sw .flap',
              'translateX': shutterTranslateX,
              'rotate'    : shutterSWRotate
            } , {
              'selector'  : '.mainShutter_02 .shutter_ne .flap',
              'translateX': next_shutterTranslateX,
              'rotate'    : next_shutterNEFixed 
            } , {
              'selector'  : '.mainShutter_02 .shutter_sw .flap',
              'translateX': next_shutterTranslateX,
              'rotate'    : next_shutterSWFixed
            } , {
              'selector'  : '.section--01 .section--title--wrapper',
              'opacity'   : prev_contentOpacity,
              'translateX': prev_titleTranslateX
            } , {
              'selector'  : '.section--01 .section--description',
              'opacity'   : prev_contentOpacity,
              'translateX': prev_descTranslateX
            } , {
              'selector'  : '.section--02 .section--title--wrapper',
              'opacity'   : next_contentOpacity 
            } , {
              'selector'  : '.section--02 .section--description',
              'opacity'   : next_contentOpacity 
            }   
          ]
        } , { // —————————————————————————————————————  SHUTTER 02
          'wrapper'       : 'main',
          'target'        : '.section--02',
          'anchor'        : 3,
          'duration'      : '100%',
          'animations'    : [
            {
              'selector'  : '.mainShutter_02 .shutter_ne .flap',
              'translateX': shutterTranslateX,
              'rotate'    : shutterNERotate
            } , {
              'selector'  : '.mainShutter_02 .shutter_sw .flap',
              'translateX': shutterTranslateX,
              'rotate'    : shutterSWRotate
            } , {
              'selector'  : '.mainShutter_03 .shutter_ne .flap',
              'translateX': next_shutterTranslateX,
              'rotate'    : next_shutterNEFixed 
            } , {
              'selector'  : '.mainShutter_03 .shutter_sw .flap',
              'translateX': next_shutterTranslateX,
              'rotate'    : next_shutterSWFixed
            } , {
              'selector'  : '.section--02 .section--title--wrapper',
              'opacity'   : prev_contentOpacity,
              'translateX': prev_titleTranslateX 
            } , {
              'selector'  : '.section--02 .section--description',
              'opacity'   : prev_contentOpacity,
              'translateX': prev_descTranslateX
            } , {
              'selector'  : '.section--03 .section--title--wrapper',
              'opacity'   : next_contentOpacity 
            } , {
              'selector'  : '.section--03 .section--description',
              'opacity'   : next_contentOpacity 
            } 
          ]
        } , { // —————————————————————————————————————  SHUTTER 03
          'wrapper'       : 'main',
          'target'        : '.section--03',
          'anchor'        : 4,
          'duration'      : '100%',
          'animations'    : [
            {
              'selector'  : '.mainShutter_03 .shutter_ne .flap',
              'translateX': shutterTranslateX,
              'rotate'    : shutterNERotate
            } , {
              'selector'  : '.mainShutter_03 .shutter_sw .flap',
              'translateX': shutterTranslateX,
              'rotate'    : shutterSWRotate
            } , {
              'selector'  : '.mainShutter_04 .shutter_ne .flap',
              'translateX': next_shutterTranslateX,
              'rotate'    : next_shutterNEFixed 
            } , {
              'selector'  : '.mainShutter_04 .shutter_sw .flap',
              'translateX': next_shutterTranslateX,
              'rotate'    : next_shutterSWFixed
            } , {
              'selector'  : '.section--03 .section--title--wrapper',
              'opacity'   : prev_contentOpacity,
              'translateX': prev_titleTranslateX
            } , {
              'selector'  : '.section--03 .section--description',
              'opacity'   : prev_contentOpacity,
              'translateX': prev_descTranslateX
            } , {
              'selector'  : '.section--04 .section__references--pattern',
              'opacity'   : dGrid_contentOpacity,
              'rotate'    : [-45, -45]
            } , {
              'selector'  : '.section--04 .section--title--wrapper',
              'opacity'   : next_contentOpacity 
            } , {
              'selector'  : '.section--04 .reference--list',
              'opacity'   : dGrid_contentOpacity 
            }    
          ]
        } , { // —————————————————————————————————————  SHUTTER 04
          'wrapper'       : 'main',
          'target'        : '.section--04',
          'anchor'        : 5,
          'duration'      : '100%',
          'animations'    : [
            {
              'selector'  : '.mainShutter_04 .shutter_ne .flap',
              'translateX': shutterTranslateX,
              'rotate'    : shutterNERotate
            } , {
              'selector'  : '.mainShutter_04 .shutter_sw .flap',
              'translateX': shutterTranslateX,
              'rotate'    : shutterSWRotate
            } , {
              'selector'  : '.mainShutter_05 .shutter_ne .flap',
              'translateX': next_shutterTranslateX,
              'rotate'    : next_shutterNEFixed 
            } , {
              'selector'  : '.mainShutter_05 .shutter_sw .flap',
              'translateX': next_shutterTranslateX,
              'rotate'    : next_shutterSWFixed
            } , {
              'selector'  : '.section--04 .section__references--pattern',
              'opacity'   : prev_contentOpacity,
              'rotate'    : [-45, -45]
            } , {
              'selector'  : '.section--04 .section--title--wrapper',
              'opacity'   : prev_contentOpacity,
              'translateX': prev_titleTranslateX
            } , {
              'selector'  : '.section--04 .reference--list',
              'opacity'   : prev_contentOpacity
            } , {
              'selector'  : '.section--05 .section--title--wrapper',
              'opacity'   : next_contentOpacity 
            } , {
              'selector'  : '.section--05 .section--description',
              'opacity'   : next_contentOpacity 
            }    
          ]
        } , { // —————————————————————————————————————  SHUTTER 05
          'wrapper'       : 'main',
          'target'        : '.section--05',
          'anchor'        : 6,
          'duration'      : '100%',
          'animations'    : []
        }
        ];

    /*  Construction
    -------------------------------------------------- */
    _init = function() {
      scrollIntervalID = setInterval(_updatePage, 10); //default = 10
      _setupValues();
      is_playable = true;
    };

    _setupValues = function() {
      $scrollTop = $window.scrollTop();
      windowHeight = $window.height();
      windowWidth = $window.width();
      _convertAllPropsToPx();
      _buildPage();
    };

    _buildPage = function() {
      var i, j, k;
      for(i=0;i<keyframes.length;i++) { // loop keyframes
          bodyHeight += keyframes[i].duration;
          if($.inArray(keyframes[i].wrapper, wrappers) === -1) {
            wrappers.push(keyframes[i].target);
          }
          if(keyframes[i].anchor !== undefined) {
            anchorTotal = keyframes[i].anchor;
          }
          for(j=0;j<keyframes[i].animations.length;j++) { // loop animations
            Object.keys(keyframes[i].animations[j]).forEach(function(key) { // loop properties
              value = keyframes[i].animations[j][key];
              if(key !== 'selector' && value instanceof Array === false) {
                var valueSet = [];
                valueSet.push(_getDefaultPropertyValue(key), value);
                value = valueSet;
              }
              keyframes[i].animations[j][key] = value;
            });
          }
      }
      $('main').height(windowHeight);
      $body.height(bodyHeight); 
      $window.scroll(0);

      currentWrapper = wrappers[0];
      $(currentWrapper).addClass('is_visible');
      $shutter.attr('data__anchor-total', anchorTotal);
    };

    _convertAllPropsToPx = function() {
      var i, j, k;
      for(i=0;i<keyframes.length;i++) { // loop keyframes
        keyframes[i].duration = _convertPercentToPx(keyframes[i].duration, 'y');
        for(j=0;j<keyframes[i].animations.length;j++) { // loop animations
          Object.keys(keyframes[i].animations[j]).forEach(function(key) { // loop properties
            value = keyframes[i].animations[j][key];
            if(key !== 'selector') {
              if(value instanceof Array) { // if its an array
                for(k=0;k<value.length;k++) { // if value in array is %
                  if(typeof value[k] === "string") {
                    if(key === 'translateY') {
                      value[k] = _convertPercentToPx(value[k], 'y');
                    } else {
                      value[k] = _convertPercentToPx(value[k], 'x');
                    }
                  }
                } 
              } else {
                if(typeof value === "string") { // if single value is a %
                  if(key === 'translateY') {
                    value = _convertPercentToPx(value, 'y');
                  } else {
                    value = _convertPercentToPx(value, 'x');
                  }
                }
              }
              keyframes[i].animations[j][key] = value;
            }
          });
        }
      }
    };

    _getDefaultPropertyValue = function(property) {
      switch (property) {
        case 'translateX':
          return 0;
        case 'translateY':
          return 0;
        case 'scale':
          return 1 ;
        case 'rotate':
          return 0;
        case 'opacity':
          return 1;
        default:
          return null;
      }
    };

    /*  Animation/Scrolling
    -------------------------------------------------- */
    _updatePage = function() {
      window.requestAnimationFrame(function() {
        _setScrollTops();
        if($scrollTop > 0 && $scrollTop <= (bodyHeight - windowHeight + 1)) { // 10px added to force behavior on last scroll
          _animateElements();
          _setKeyframe();
        }
      });
    };

    _setScrollTops = function() {
      $scrollTop = $window.scrollTop();
      relativeScrollTop = $scrollTop - prevKeyframesDurations;
    };

    _animateElements = function() {
      var animation, translateY, translateX, scale, rotate, opacity;
      for(var i=0;i<keyframes[currentKeyframe].animations.length;i++) {
        animation   = keyframes[currentKeyframe].animations[i];
        translateY  = _calcPropValue(animation, 'translateY');
        translateX  = _calcPropValue(animation, 'translateX');
        scale       = _calcPropValue(animation, 'scale');
        rotate      = _calcPropValue(animation, 'rotate');
        opacity     = _calcPropValue(animation, 'opacity');

        $(animation.selector).css({
          'transform':    'translate3d(' + translateX +'px, ' + translateY + 'px, 0) scale('+ scale +') rotate('+ rotate +'deg)',
          'opacity' : opacity
        });
      }
    };

    _calcPropValue = function(animation, property) {
      var value = animation[property];
      if(value) {
        value = _easeInOutQuad(relativeScrollTop, value[0], (value[1]-value[0]), keyframes[currentKeyframe].duration);
      } else {
        value = _getDefaultPropertyValue(property);
      }
      value = +value.toFixed(4) 
      return value;
    };

    _easeInOutQuad = function (t, b, c, d) {
      //sinusoadial in and out
      return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
    };

    _linear = function(t, b, c, d) {
      return c * t / d + b
    }

    _setKeyframe = function() {
      if($scrollTop >= (keyframes[currentKeyframe].duration + prevKeyframesDurations)) {
          prevKeyframesDurations += keyframes[currentKeyframe].duration;
          currentKeyframe++;
          _showCurrentWrappers();
      } else if($scrollTop < prevKeyframesDurations) {
          currentKeyframe--;
          prevKeyframesDurations -= keyframes[currentKeyframe].duration;
          _showCurrentWrappers();
      }
    };

    _showCurrentWrappers = function() {

      if(keyframes[currentKeyframe].target !== currentWrapper) {

        // Toggle visibility
        $(currentWrapper).removeClass('is_visible');
        $(keyframes[currentKeyframe].target).addClass('is_visible');

        currentWrapper = keyframes[currentKeyframe].target;

        // Update nav data
        anchor = keyframes[currentKeyframe].anchor;
        $shutter.attr('data__current-shutter', anchor);

        // Update nav control color
        if( anchor % 2 == 0){ // if even
          $next.addClass('even');
        } else {
          $next.removeClass('even');
        }
        
      }
      
    };

    /*  Helpers
    -------------------------------------------------- */

    _convertPercentToPx = function(value, axis) {
      if(typeof value === "string" && value.match(/%/g)) {
        if(axis === 'y') { value = (parseFloat(value) / 100) * windowHeight; }
        if(axis === 'x') { value = (parseFloat(value) / 100) * windowWidth; }
      }
      return value;
    };




    _scrollTo = function(element, to, duration) {
        var start = element.scrollTop(),
            change = to - start,
            currentTime = 0,
            increment = 20;

        isAnimating = true;

        var animateScroll = function(){        
            currentTime += increment;
            var val = _easeInOutQuad(currentTime, start, change, duration);                        
            element.scrollTop(val); 
            if(currentTime < duration) {
                setTimeout(animateScroll, increment);
      
            } else {
              isAnimating = false;
    
            }
        };

        animateScroll();
    }


    _goTo = function(element, direction, anchor, e){
      var target;

      e.preventDefault();

      if(direction === 'down') {
        target = ((anchor) * windowHeight); 
      } else {
        target = ((anchor - 2) * windowHeight);
      }

      _scrollTo(element, target, 800);
    }


    _kill = function(){

      // Destroy Interval
      clearInterval(scrollIntervalID);

      // Remove js added style/animation
      $body.removeAttr("style");
      $('main').removeAttr("style");

      var i, j;
      for(i=0;i<keyframes.length;i++) { // loop keyframes
        for(j=0;j<keyframes[i].animations.length;j++) { // loop animations
          var modifiedElements = keyframes[i].animations[j].selector
          $(modifiedElements).removeAttr("style");
        }
      }

    }

    if (action === 'start'){
      _init();
    } else {
      _kill();
    }

    // Binding event

    $('.js--nextSection').click(function(e){
      _goTo($(document), 'down', anchor, e);
    });

    // Quickly bind same event on down arrow
    $('body').keydown(function(e){

      keyCode = e.keyCode;

      if (keyCode === 40 && isAnimating === false) {
        _goTo($(document), 'down', anchor, e);
      }

      if (keyCode === 38 && isAnimating === false) {
        _goTo($(document), 'up', anchor, e);
      } 

    });

};