mediaCheck({
  media: '(min-width: 1280px)',
  entry: function() {
    animateStart('start');
  },
  exit: function() {
    animateStart('stop');
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

    var next_contentOpacity     = [-3, 3];

    var prev_contentOpacity     = [1, -6],
        prev_titleTranslateX    = '-10%',
        prev_descTranslateX     = '10%'


    var PROPERTIES =               ['translateX', 'translateY', 'opacity', 'rotate', 'scale'],
        $window =                  $(window),
        $body =                    $('body'),
        wrappers =                 [],
        currentWrapper =           null,
        scrollIntervalID =         0,
        bodyHeight =               0,
        windowHeight =             0,
        windowWidth =              0,
        prevKeyframesDurations =   0,
        scrollTop =                0,
        relativeScrollTop =        0,
        currentKeyframe =          0,
        keyframes = [
        { // ————————————————————————————————————————  SHUTTER 00
          'wrapper'       : 'main',
          'target'        : '.section--00',
          'duration'      : '100%',
          'animations'    : [
            {
              'selector'  : '.main--shutter-00 .shutter-ne .flap',
              'translateX': shutterTranslateX,
              'rotate'    : shutterNERotate
            } , {
              'selector'  : '.main--shutter-00 .shutter-sw .flap',
              'translateX': shutterTranslateX,
              'rotate'    : shutterSWRotate
            } , {
              'selector'  : '.main--shutter-01 .shutter-ne .flap',
              'translateX': next_shutterTranslateX,
              'rotate'    : next_shutterNEFixed
            } , {
              'selector'  : '.main--shutter-01 .shutter-sw .flap',
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
          'duration'      : '100%',
          'animations'    : [
            {
              'selector'  : '.main--shutter-01 .shutter-ne .flap',
              'translateX': shutterTranslateX,
              'rotate'    : shutterNERotate
            } , {
              'selector'  : '.main--shutter-01 .shutter-sw .flap',
              'translateX': shutterTranslateX,
              'rotate'    : shutterSWRotate
            } , {
              'selector'  : '.main--shutter-02 .shutter-ne .flap',
              'translateX': next_shutterTranslateX,
              'rotate'    : next_shutterNEFixed 
            } , {
              'selector'  : '.main--shutter-02 .shutter-sw .flap',
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
          'duration'      : '100%',
          'animations'    : [
            {
              'selector'  : '.main--shutter-02 .shutter-ne .flap',
              'translateX': shutterTranslateX,
              'rotate'    : shutterNERotate
            } , {
              'selector'  : '.main--shutter-02 .shutter-sw .flap',
              'translateX': shutterTranslateX,
              'rotate'    : shutterSWRotate
            } , {
              'selector'  : '.main--shutter-03 .shutter-ne .flap',
              'translateX': next_shutterTranslateX,
              'rotate'    : next_shutterNEFixed 
            } , {
              'selector'  : '.main--shutter-03 .shutter-sw .flap',
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
          'duration'      : '100%',
          'animations'    : [
            {
              'selector'  : '.main--shutter-03 .shutter-ne .flap',
              'translateX': shutterTranslateX,
              'rotate'    : shutterNERotate
            } , {
              'selector'  : '.main--shutter-03 .shutter-sw .flap',
              'translateX': shutterTranslateX,
              'rotate'    : shutterSWRotate
            } , {
              'selector'  : '.main--shutter-04 .shutter-ne .flap',
              'translateX': next_shutterTranslateX,
              'rotate'    : next_shutterNEFixed 
            } , {
              'selector'  : '.main--shutter-04 .shutter-sw .flap',
              'translateX': next_shutterTranslateX,
              'rotate'    : next_shutterSWFixed
            } , {
              'selector'  : '.section--03 .section--title--wrapper',
              'opacity'   : prev_contentOpacity,
              'translateX': prev_titleTranslateX ,
            } , {
              'selector'  : '.section--03 .section--description',
              'opacity'   : prev_contentOpacity,
              'translateX': prev_descTranslateX,
            } , {
              'selector'  : '.section--04 .section--title--wrapper',
              'opacity'   : next_contentOpacity 
            } , {
              'selector'  : '.section--04 .reference--list',
              'opacity'   : next_contentOpacity 
            }    
          ]
        } , { // —————————————————————————————————————  SHUTTER 04
          'wrapper'       : 'main',
          'target'        : '.section--04',
          'duration'      : '100%',
          'animations'    : [
            {
              'selector'  : '.main--shutter-04 .shutter-ne .flap',
              'translateX': shutterTranslateX,
              'rotate'    : shutterNERotate
            } , {
              'selector'  : '.main--shutter-04 .shutter-sw .flap',
              'translateX': shutterTranslateX,
              'rotate'    : shutterSWRotate
            } , {
              'selector'  : '.main--shutter-05 .shutter-ne .flap',
              'translateX': next_shutterTranslateX,
              'rotate'    : next_shutterNEFixed 
            } , {
              'selector'  : '.main--shutter-05 .shutter-sw .flap',
              'translateX': next_shutterTranslateX,
              'rotate'    : next_shutterSWFixed
            } , {
              'selector'  : '.section--04 .section--title--wrapper',
              'opacity'   : prev_contentOpacity,
              'translateX': prev_titleTranslateX ,
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
        } , {
          'wrapper'     : 'main',
          'target'      : '.test',
          'duration'    : '100%',
          'animations'  :  []
        }
        ];

    /*  Construction
    -------------------------------------------------- */
    init = function() {
      scrollIntervalID = setInterval(updatePage, 10); //default = 10
      setupValues();

      $window.resize(throwError);
    };

    setupValues = function() {
      scrollTop = $window.scrollTop();
      windowHeight = $window.height();
      windowWidth = $window.width();
      convertAllPropsToPx();
      buildPage();
    };

    buildPage = function() {
      var i, j, k;
      for(i=0;i<keyframes.length;i++) { // loop keyframes
          bodyHeight += keyframes[i].duration;
          if($.inArray(keyframes[i].wrapper, wrappers) === -1) {
            wrappers.push(keyframes[i].target);
          }
          for(j=0;j<keyframes[i].animations.length;j++) { // loop animations
            Object.keys(keyframes[i].animations[j]).forEach(function(key) { // loop properties
              value = keyframes[i].animations[j][key];
              if(key !== 'selector' && value instanceof Array === false) {
                var valueSet = [];
                valueSet.push(getDefaultPropertyValue(key), value);
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
      $(currentWrapper).addClass('is--visible');
    };

    convertAllPropsToPx = function() {
      var i, j, k;
      for(i=0;i<keyframes.length;i++) { // loop keyframes
        keyframes[i].duration = convertPercentToPx(keyframes[i].duration, 'y');
        for(j=0;j<keyframes[i].animations.length;j++) { // loop animations
          Object.keys(keyframes[i].animations[j]).forEach(function(key) { // loop properties
            value = keyframes[i].animations[j][key];
            if(key !== 'selector') {
              if(value instanceof Array) { // if its an array
                for(k=0;k<value.length;k++) { // if value in array is %
                  if(typeof value[k] === "string") {
                    if(key === 'translateY') {
                      value[k] = convertPercentToPx(value[k], 'y');
                    } else {
                      value[k] = convertPercentToPx(value[k], 'x');
                    }
                  }
                } 
              } else {
                if(typeof value === "string") { // if single value is a %
                  if(key === 'translateY') {
                    value = convertPercentToPx(value, 'y');
                  } else {
                    value = convertPercentToPx(value, 'x');
                  }
                }
              }
              keyframes[i].animations[j][key] = value;
            }
          });
        }
      }
    };

    getDefaultPropertyValue = function(property) {
      switch (property) {
        case 'translateX':
          return 0;
        case 'translateY':
          return 0;
        case 'scale':
          return 1;
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
    updatePage = function() {
      window.requestAnimationFrame(function() {
        setScrollTops();
        if(scrollTop > 0 && scrollTop <= (bodyHeight - windowHeight)) {
          animateElements();
          setKeyframe();
        }
      });
    };

    setScrollTops = function() {
      scrollTop = $window.scrollTop();
      relativeScrollTop = scrollTop - prevKeyframesDurations;
    };

    animateElements = function() {
      var animation, translateY, translateX, scale, rotate, opacity;
      for(var i=0;i<keyframes[currentKeyframe].animations.length;i++) {
        animation   = keyframes[currentKeyframe].animations[i];
        translateY  = calcPropValue(animation, 'translateY');
        translateX  = calcPropValue(animation, 'translateX');
        scale       = calcPropValue(animation, 'scale');
        rotate      = calcPropValue(animation, 'rotate');
        opacity     = calcPropValue(animation, 'opacity');

        $(animation.selector).css({
          'transform':    'translate3d(' + translateX +'px, ' + translateY + 'px, 0) scale('+ scale +') rotate('+ rotate +'deg)',
          'opacity' : opacity
        });
      }
    };

    calcPropValue = function(animation, property) {
      var value = animation[property];
      if(value) {
        value = easeInOutQuad(relativeScrollTop, value[0], (value[1]-value[0]), keyframes[currentKeyframe].duration);
      } else {
        value = getDefaultPropertyValue(property);
      }
      value = +value.toFixed(4) 
      return value;
    };

    easeInOutQuad = function (t, b, c, d) {
      //sinusoadial in and out
      return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
    };

    linear = function(t, b, c, d) {
      return c * t / d + b
    }

    setKeyframe = function() {
      if(scrollTop > (keyframes[currentKeyframe].duration + prevKeyframesDurations)) {
          prevKeyframesDurations += keyframes[currentKeyframe].duration;
          currentKeyframe++;
          showCurrentWrappers();
      } else if(scrollTop < prevKeyframesDurations) {
          currentKeyframe--;
          prevKeyframesDurations -= keyframes[currentKeyframe].duration;
          showCurrentWrappers();
      }
    };

    showCurrentWrappers = function() {

      if(keyframes[currentKeyframe].target !== currentWrapper) {
        // $(currentWrapper).hide();
        // $(keyframes[currentKeyframe].target).show();

        $(currentWrapper).removeClass('is--visible');
        $(keyframes[currentKeyframe].target).addClass('is--visible');

        currentWrapper = keyframes[currentKeyframe].target;
      }
      
    };

    /*  Helpers
    -------------------------------------------------- */

    convertPercentToPx = function(value, axis) {
      if(typeof value === "string" && value.match(/%/g)) {
        if(axis === 'y') { value = (parseFloat(value) / 100) * windowHeight; }
        if(axis === 'x') { value = (parseFloat(value) / 100) * windowWidth; }
      }
      return value;
    };

    throwError = function() {
      $body.addClass('page-error');
    };

    kill = function(){

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
      init();
    } else {
      kill();
    }

};