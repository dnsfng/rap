(function() {
  $(function() {


    /*  Globals
    -------------------------------------------------- */

    var shutterTranslateX       = '-100%',
        shutterNERotate         = [-20,-48],
        shutterSWRotate         = [20,48];

    var next_shutterTranslateX  = ['100%','0%'],
        next_shutterNEFixed     = [0,-20],
        next_shutterSWFixed     = [0,20];

    var next_contentOpacity     = [-3, 1],
        dGrid_contentOpacity    = [-20, 1];

    var prev_contentOpacity     = [1, -6],
        prev_titleTranslateX    = '-10%',
        prev_descTranslateX     = '10%';

    var mailOpacityOut          = [3,0],
        mailOpacityIn           = [-3,1];


    var PROPERTIES =               ['translateX', 'translateY', 'opacity', 'rotate', 'scale'],
        $window =                  $(window),
        $body =                    $('body'),
        $main =                    $('main'),
        wrappers =                 [],
        currentWrapper =           null,
        scrollIntervalID =         0,
        bodyHeight =               0,
        windowHeight =             0,
        windowWidth =              0,
        prevKeyframesDurations =   0,
        $scrollTop =               0,
        relativeScrollTop =        0,
        anchor =                   0,
        anchorTotal =              0,
        isScrolling =              false,
        isAnimateAble =            true,
        currentKeyframe =          0,
        keyframes = [
        { 'wrapper'       : 'main',
          'target'        : '.section--00',
          'anchor'        : 0,
          'duration'      : '20%',
          'animations'    : [
          {
            'selector'  : '.section--00 .logo',
            'opacity'   : [1,1]
          }
          ]
        } , { // ————————————————————————————————————————  SHUTTER 00
          'wrapper'       : 'main',
          'target'        : '.section--00',
          'anchor'        : 0,
          'duration'      : '60%',
          'animations'    : [
            {
              'selector'  : '.section--00 .shutter_ne .flap',
              'translateX': shutterTranslateX,
              'rotate'    : shutterNERotate
            } , {
              'selector'  : '.section--00 .shutter_sw .flap',
              'translateX': shutterTranslateX,
              'rotate'    : shutterSWRotate
            } , {
              'selector'  : '.section--00 .logo',
              'opacity'   : [1,-6]
            } , {
              'selector'  : '.section--01 .flap',
              'rotate'    : 0
            } , {
              'selector'  : '.section--02 .flap',
              'rotate'    : 0
            } , {
              'selector'  : '.section--03 .flap',
              'rotate'    : 0
            } , {
              'selector'  : '.mail--icon-black',
              'opacity'   : mailOpacityOut
            } , {
              'selector'  : '.logo--wrapper',
              'translateX': ['-9%','0%'],
              'translateY': ['-16%','0%'],
              'opacity'   : [-6, 1.5]
            }
          ]
        } , { //  Transition
          'wrapper'       : 'main',
          'target'        : '.section--00',
          'anchor'        : 0,
          'duration'      : '20%',
          'animations'    : [
            {
              'selector'  : '.section--01 .shutter_ne .flap',
              'rotate'    : next_shutterNEFixed
            } , {
              'selector'  : '.section--01 .shutter_sw .flap',
              'rotate'    : next_shutterSWFixed
            }
          ]
        } , { // —————————————————————————————————————  SHUTTER 01
          'wrapper'       : 'main',
          'target'        : '.section--01',
          'anchor'        : 1,
          'duration'      : '80%',
          'animations'    : [
            {
              'selector'  : '.section--01 .shutter_ne .flap',
              'translateX': shutterTranslateX,
              'rotate'    : shutterNERotate
            } , {
              'selector'  : '.section--01 .shutter_sw .flap',
              'translateX': shutterTranslateX,
              'rotate'    : shutterSWRotate
            } , {
              'selector'  : '.section--01 .section--title--wrapper',
              'opacity'   : prev_contentOpacity,
              'translateX': prev_titleTranslateX
            } , {
              'selector'  : '.section--01 .section--description',
              'opacity'   : prev_contentOpacity,
              'translateX': prev_descTranslateX
            } , {
              'selector'  : '.mail--icon-black',
              'opacity'   : mailOpacityIn
            } , {
              'selector'  : '.logo--icon-white',
              'opacity'   : [4, 0]
            }
          ]
        } , { // Transition
          'wrapper'       : 'main',
          'target'        : '.section--01',
          'anchor'        : 1,
          'duration'      : '20%',
          'animations'    : [
            {
              'selector'  : '.section--02 .shutter_ne .flap',
              'rotate'    : next_shutterNEFixed
            } , {
              'selector'  : '.section--02 .shutter_sw .flap',
              'rotate'    : next_shutterSWFixed
            }
          ]
        } , { // —————————————————————————————————————  SHUTTER 02
          'wrapper'       : 'main',
          'target'        : '.section--02',
          'anchor'        : 2,
          'duration'      : '80%',
          'animations'    : [
            {
              'selector'  : '.section--02 .shutter_ne .flap',
              'translateX': shutterTranslateX,
              'rotate'    : shutterNERotate
            } , {
              'selector'  : '.section--02 .shutter_sw .flap',
              'translateX': shutterTranslateX,
              'rotate'    : shutterSWRotate
            } , {
              'selector'  : '.section--02 .section--title--wrapper',
              'opacity'   : prev_contentOpacity,
              'translateX': prev_titleTranslateX 
            } , {
              'selector'  : '.section--02 .section--description',
              'opacity'   : prev_contentOpacity,
              'translateX': prev_descTranslateX
            } , {
              'selector'  : '.mail--icon-black',
              'opacity'   : mailOpacityOut
            } , {
              'selector'  : '.logo--icon-white',
              'opacity'   : [-2, 1]
            }
          ]
        } , { // Transition
          'wrapper'       : 'main',
          'target'        : '.section--02',
          'anchor'        : 2,
          'duration'      : '20%',
          'animations'    : [
            {
              'selector'  : '.section--03 .shutter_ne .flap',
              'rotate'    : next_shutterNEFixed
            } , {
              'selector'  : '.section--03 .shutter_sw .flap',
              'rotate'    : next_shutterSWFixed
            }
          ]
        } , { // —————————————————————————————————————  SHUTTER 03
          'wrapper'       : 'main',
          'target'        : '.section--03',
          'anchor'        : 3,
          'duration'      : '80%',
          'animations'    : [
            {
              'selector'  : '.section--03 .shutter_ne .flap',
              'translateX': shutterTranslateX,
              'rotate'    : shutterNERotate
            } , {
              'selector'  : '.section--03 .shutter_sw .flap',
              'translateX': shutterTranslateX,
              'rotate'    : shutterSWRotate
            } , {
              'selector'  : '.section--03 .section--title--wrapper',
              'opacity'   : prev_contentOpacity,
              'translateX': prev_titleTranslateX
            } , {
              'selector'  : '.section--03 .section--description',
              'opacity'   : prev_contentOpacity,
              'translateX': prev_descTranslateX
            }
          ]
        } , { //  Transition
          'wrapper'       : 'main',
          'target'        : '.section--03',
          'anchor'        : 3,
          'duration'      : '20%',
          'animations'    : [
            {
              'selector'  : '.section--04 .shutter_ne .flap',
              // 'rotate'    : next_shutterNEFixed
              'rotate'    : [90, 65]
            } , {
              'selector'  : '.section--04 .shutter_sw .flap',
              // 'rotate'    : next_shutterSWFixed
              'rotate'    : [-90, -65]
            }
          ]
        } , { // —————————————————————————————————————  SHUTTER 04
          'wrapper'       : 'main',
          'target'        : '.section--04',
          'anchor'        : 4,
          'duration'      : '100%',
          'animations'    : [
            {
              'selector'  : '.section--04 .shutter_ne .flap',
              'translateX': shutterTranslateX,
              // 'rotate'    : shutterNERotate
              'rotate'    : [65, 42]
            } , {
              'selector'  : '.section--04 .shutter_sw .flap',
              'translateX': shutterTranslateX,
              // 'rotate'    : shutterSWRotate
              'rotate'    : [-65, -42]
            } , {
              'selector'  : '.section--04 .bgImage--wrapper',
              'opacity'   : [4, -0.75]
            } , {
              'selector'  : '.section--04 .mainShutter--wrapper',
              'opacity'   : [5, 0]
            } , {
              'selector'  : '.section--04 .section--wrapper',
              'opacity'   : [5, 0]
            } , {
              'selector'  : '.section--04 .section--title--wrapper',
              'opacity'   : prev_contentOpacity,
              'translateX': prev_titleTranslateX
            } , {
              'selector'  : '.section--04 .section--description',
              'opacity'   : prev_contentOpacity,
              'translateX': prev_descTranslateX
            } , {
              'selector'  : '.nextSection--arrow',
              'opacity'   : [1,0]
            } , {
              'selector'  : '.mail--icon-black',
              'opacity'   : mailOpacityIn
            } , {
              'selector'  : '.logo--icon-white',
              'opacity'   : [4, 0]
            }

          ]
        } , { // —————————————————————————————————————  SHUTTER 05
          'wrapper'       : 'main',
          'target'        : '.section--05',
          'anchor'        : 5,
          'visibility'    : 'always',
          'duration'      : '100%',
          'animations'    : [
          ]
        }
        ];

    /*  Construction
    -------------------------------------------------- */
    _init = function() {

      _scrollTo($(window), 1, 400); // force top of page
      scrollIntervalID = setInterval(_updatePage, 10); //default = 10
      _setupValues();

    };



    _setupValues = function() {

      $scrollTop = $window.scrollTop();
      windowHeight = $window.height();
      windowWidth = $window.width();

      // re initiate values when resizing
      wrappers                = [];
      bodyHeight              = 0;
      prevKeyframesDurations  = 0;
      $scrollTop              = 0;
      relativeScrollTop       = 0;
      anchor                  = 0;
      currentKeyframe         = 0;

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

      // set current wrapper and shutter and make then visible
      currentWrapper = keyframes[currentKeyframe].target;
      $main.attr('data__anchor-total', anchorTotal);
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
      value = +value.toFixed(5) 
      return value;

    };




    _easeInOutQuad = function (t, b, c, d) {

      //sinusoadial in and out
      return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;

    };




    _linear = function(t, b, c, d) {

      return c * t / d + b

    };




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

        // MANAGE VISIBILITY

        // Hide only if scrolling down
        var nextAnchor = keyframes[currentKeyframe].anchor;
        if(nextAnchor > anchor){ $(currentWrapper).hide(); };

        // Always show upcoming section
        $(keyframes[currentKeyframe].target).show();

        // Update nav data
        currentWrapper = keyframes[currentKeyframe].target;
        anchor = keyframes[currentKeyframe].anchor;

        //
        $main.attr('data__current-shutter', anchor);

        if(anchor === anchorTotal){
          $('.nextSection--arrow').hide();
        } else {
          $('.nextSection--arrow').show();
        };
        
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

        isScrolling = true;

        var animateScroll = function(){        
            currentTime += increment;
            var val = _easeInOutQuad(currentTime, start, change, duration);                        
            element.scrollTop(val); 
            if(currentTime < duration) {
                setTimeout(animateScroll, increment);
      
            } else {
              isScrolling = false;
    
            }
        };

        animateScroll();
    }


    _goTo = function(element, direction, anchor, e){
      var target;

      e.preventDefault();

      if(direction === 'down') {
        target = ((anchor + 1) * windowHeight); 
      } else {
        target = ((anchor - 1) * windowHeight);
      }

      _scrollTo(element, target, 800);
    }


    _kill = function(){

      // Destroy Interval
      clearInterval(scrollIntervalID);

      // Remove js added style/animation
      $body.removeAttr("style");
      $('main').removeAttr("style");
      $('section').show();

      var i, j;
      for(i=0;i<keyframes.length;i++) { // loop keyframes
        for(j=0;j<keyframes[i].animations.length;j++) { // loop animations
          var modifiedElements = keyframes[i].animations[j].selector
          $(modifiedElements).attr("style","");
        }
      }

    }




    // Bind event on UI element

    $('.js--nextSection').click(function(e){
      _goTo($(document), 'down', anchor, e);
    });

    // Bind same event on keyboard controls
    $('body').keydown(function(e){

      keyCode = e.keyCode;

      if (keyCode === 40 && isScrolling === false) {
        _goTo($(document), 'down', anchor, e);
      }

      if (keyCode === 38 && isScrolling === false) {
        _goTo($(document), 'up', anchor, e);
      } 

    });

    $('.logo--wrapper').click(function(e){
      e.preventDefault();
      _scrollTo($(document), 0, 2000);
    });




    // Resize Events

    // Later, if resized to small screen size
    $(window).resize(function() {
      if (Modernizr.mq('screen and (max-width : 1199px)') && isAnimateAble == true ) {
        _kill();

        isAnimateAble = false;
      }
    });

    // Later, if resized to large screen size
    $(window).resize(function() {
      if (Modernizr.mq('screen and (min-width : 1200px)') && isAnimateAble == false ) {
        _init(); 

        isAnimateAble = true;       
      }
    });




    // Let's start
    _init();

  })
}).call(this);