// Base

(function() {
  $(function() {

    /*  Globals
    -------------------------------------------------- */
    var PROPERTIES =               ['translateX', 'translateY', 'opacity', 'rotate', 'scale'],
        $window =                  $(window),
        $body =                    $('body'),
        wrappers =                 [],
        currentWrapper =           null,
        scrollTimeoutID =          0,
        bodyHeight =               0,
        windowHeight =             0,
        windowWidth =              0,
        prevKeyframesDurations =   0,
        scrollTop =                0,
        relativeScrollTop =        0,
        currentKeyframe =          0,
        keyframes = [
        { // SHUTTER 00
          'wrapper'       : 'main',
          'target'        : '.section--00',
          'duration'      : '100%',
          'animations'    : [
            {
              'selector'  : '.main--shutter-00 .shutter-ne .flap',
              'translateX': '-80%',
              'rotate'    : [60,45]
            } , {
              'selector'  : '.main--shutter-00 .shutter-sw .flap',
              'translateX': '-80%',
              'rotate'    : [-60,-45]
            } , {
              'selector'  : '.section--01 .section--title--wrapper',
              'opacity'   : [-1, 1]
            } , {
              'selector'  : '.section--01 .section--description',
              'opacity'   : [-1, 1]
            } 
          ]
        } , { // SHUTTER 01
          'wrapper'       : 'main',
          'target'        : '.section--01',
          'duration'      : '100%',
          'animations'    : [
            {
              'selector'  : '.main--shutter-01 .shutter-ne .flap',
              'translateX': '-80%',
              'rotate'    : [60,45]
            } , {
              'selector'  : '.main--shutter-01 .shutter-sw .flap',
              'translateX': '-80%',
              'rotate'    : [-60,-45]
            } , {
              'selector'  : '.section--01 .section--title--wrapper',
              'opacity'   : [1, -6],
              'translateX': '-10%',
            } , {
              'selector'  : '.section--01 .section--description',
              'opacity'   : [1, -6],
              'translateX': '10%',
            } , {
              'selector'  : '.section--02 .section--title--wrapper',
              'opacity'   : [-3, 3],
            } , {
              'selector'  : '.section--02 .section--description',
              'opacity'   : [-3, 3]
            }   
          ]
        } , { // SHUTTER 02
          'wrapper'       : 'main',
          'target'        : '.section--02',
          'duration'      : '100%',
          'animations'    : [
            {
              'selector'  : '.main--shutter-02 .shutter-ne .flap',
              'translateX': '-80%',
              'rotate'    : [60,45]
            } , {
              'selector'  : '.main--shutter-02 .shutter-sw .flap',
              'translateX': '-80%',
              'rotate'    : [-60,-45]
            } , {
              'selector'  : '.section--02 .section--title--wrapper',
              'opacity'   : [1, -6],
              'translateX': '-10%',
            } , {
              'selector'  : '.section--02 .section--description',
              'opacity'   : [1, -6],
              'translateX': '10%',
            } , {
              'selector'  : '.section--03 .section--title--wrapper',
              'opacity'   : [-3, 3],
            } , {
              'selector'  : '.section--03 .section--description',
              'opacity'   : [-3, 3]
            } 
          ]
        } , { // SHUTTER 03
          'wrapper'       : 'main',
          'target'        : '.section--03',
          'duration'      : '100%',
          'animations'    : [
            {
              'selector'  : '.main--shutter-03 .shutter-ne .flap',
              'translateX': '-80%',
              'rotate'    : [60,45]
            } , {
              'selector'  : '.main--shutter-03 .shutter-sw .flap',
              'translateX': '-80%',
              'rotate'    : [-60,-45]
            } , {
              'selector'  : '.section--03 .section--title--wrapper',
              'opacity'   : [1, -6],
              'translateX': '-10%',
            } , {
              'selector'  : '.section--03 .section--description',
              'opacity'   : [1, -6],
              'translateX': '10%',
            } , {
              'selector'  : '.section--04 .section--title--wrapper',
              'opacity'   : [-3, 3],
            } , {
              'selector'  : '.section--04 .reference--list',
              'opacity'   : [-3, 3]
            }    
          ]
        } , { // SHUTTER 04
          'wrapper'       : 'main',
          'target'        : '.section--04',
          'duration'      : '100%',
          'animations'    : [
            {
              'selector'  : '.main--shutter-04 .shutter-ne .flap',
              'translateX': '-80%',
              'rotate'    : [60,45]
            } , {
              'selector'  : '.main--shutter-04 .shutter-sw .flap',
              'translateX': '-80%',
              'rotate'    : [-60,-45]
            } , {
              'selector'  : '.section--04 .section--title--wrapper',
              'opacity'   : [1, -6],
              'translateX': '-10%',
            } , {
              'selector'  : '.section--04 .reference--list',
              'opacity'   : [1, -6]
            } , {
              'selector'  : '.section--05 .section--title--wrapper',
              'opacity'   : [-3, 3],
            } , {
              'selector'  : '.section--05 .section--description',
              'opacity'   : [-3, 3]
            }    
          ]
        } , {
          'wrapper'     : 'main',
          'target'      : '.test',
          'duration'    : '100%',
          'animations'  :  []
        }
        // } , {
        //   'wrapper' : '.section--00',
        //   'duration' : '100%',
        //   'animations' :  []
        // } , {
        //   'wrapper' : '.section--01',
        //   'duration' : '100%',
        //   'animations' :  []
        // } , {
        //   'wrapper' : '.section--02',
        //   'duration' : '100%',
        //   'animations' :  []
        // } , {
        //   'wrapper' : '.section--03',
        //   'duration' : '100%',
        //   'animations' :  []
        // } , {
        //   'wrapper' : '.section--04',
        //   'duration' : '100%',
        //   'animations' :  []
        // }

          // {
          //   'wrapper' : '#intro',
          //   'duration' : '100%',
          //   'animations' :  [
          //     {
          //       'selector'    : '.name',
          //       'translateY'  : -140,
          //       'opacity'     : 0
          //     } , {
          //       'selector'    : '.byline',
          //       'translateY'  : -110,
          //       'opacity'     : 0
          //     } , {
          //       'selector'    : '.twitter',
          //       'opacity'     : [1, 0]
          //     }
          //   ]
          // } , {
          //   'wrapper' : '#explosion',
          //   'duration' : '150%',
          //   'animations' :  [
          //     {
          //       'selector'    : '.explosion-byline',
          //       'translateY'  : '-25%',
          //       'opacity'     : [0, 1.75] // hack to accelrate opacity speed
          //     } , {
          //       'selector'    : '#domExplosionList',
          //       'translateY'  : '-70%',
          //       'opacity'     : [0, 1] // hack to accelrate opacity speed
          //     }
          //   ]
          // } , {
          //   'wrapper' : '#explosion',
          //   'duration' : '150%',
          //   'animations' :  [
          //     {
          //       'selector'    : '.dei-1',
          //       'translateY'  : '-15%',
          //       'translateX'  : '-10%',
          //       'opacity'     : [1, 0],
          //       'scale'       : 2,
          //     } , {
          //       'selector'    : '.dei-2',
          //       'translateY'  : '-5%',
          //       'translateX'  : '-4%',
          //       'opacity'     : [1, 0] // hack to decelrate opacity speed
          //     } , {
          //       'selector'    : '.dei-3',
          //       'translateY'  : '-9%',
          //       'translateX'  : '2%',
          //       'opacity'     : [1, 0], // hack to accelrate opacity speed
          //       'scale'       : 1.2,
          //     } , {
          //       'selector'    : '.dei-4',
          //       'translateY'  : '-17%',
          //       'translateX'  : '8%',
          //       'opacity'     : [1, 0], // hack to accelrate opacity speed
          //       'scale'       : 1.5,
          //     } , {
          //       'selector'    : '.dei-5',
          //       'translateY'  : '-2%',
          //       'translateX'  : '-15%',
          //       'opacity'     : [1, 0],
          //       'scale'       : 2,
          //     } , {
          //       'selector'    : '.dei-6',
          //       'translateY'  : '-1%',
          //       'translateX'  : '-7%',
          //       'opacity'     : [1, 0], // hack to decelrate opacity speed
          //       'scale'       : 1.2,
          //     } , {
          //       'selector'    : '.dei-7',
          //       'translateY'  : '-4%',
          //       'translateX'  : '2%',
          //       'opacity'     : [1, 0], // hack to accelrate opacity speed
          //       'scale'       : 1.1,
          //     } , {
          //       'selector'    : '.dei-8',
          //       'translateY'  : '-3%',
          //       'translateX'  : '12%',
          //       'opacity'     : [1, 0], // hack to accelrate opacity speed
          //       'scale'       : 1.8,
          //     } , {
          //       'selector'    : '.dei-9',
          //       'translateY'  : '3%',
          //       'translateX'  : '-12%',
          //       'opacity'     : [1, 0],
          //       'scale'       : 1.5,
          //     } , {
          //       'selector'    : '.dei-10',
          //       'translateY'  : '5%',
          //       'translateX'  : '-4%',
          //       'opacity'     : [1, 0] // hack to decelrate opacity speed
          //     } , {
          //       'selector'    : '.dei-11',
          //       'translateY'  : '8%',
          //       'translateX'  : '6%',
          //       'opacity'     : [1, 0], // hack to accelrate opacity speed
          //       'scale'       : 1.4,
          //     } , {
          //       'selector'    : '.dei-12',
          //       'translateY'  : '1%',
          //       'translateX'  : '20%',
          //       'opacity'     : [1, 0], // hack to accelrate opacity speed
          //       'scale'       : 1.9,
          //     } , {
          //       'selector'    : '.dei-13',
          //       'translateY'  : '8%',
          //       'translateX'  : '-12%',
          //       'opacity'     : [1, 0],
          //       'scale'       : 1.8,
          //     } , {
          //       'selector'    : '.dei-14',
          //       'translateY'  : '4%',
          //       'translateX'  : '-3%',
          //       'opacity'     : [1, 0], // hack to decelrate opacity speed
          //       'scale'       : 1.3,
          //     } , {
          //       'selector'    : '.dei-15',
          //       'translateY'  : '14%',
          //       'translateX'  : '5%',
          //       'opacity'     : [1, 0], // hack to accelrate opacity speed
          //       'scale'       : 1.7,
          //     } , {
          //       'selector'    : '.dei-16',
          //       'translateY'  : '6%',
          //       'translateX'  : '9%',
          //       'opacity'     : [1, 0], // hack to accelrate opacity speed
          //       'scale'       : 2,
          //     }
          //   ]
          // } , {
          //   'wrapper' : '#explosion',
          //   'duration' : '100%',
          //   'animations' :  [
          //     {
          //       'selector'    : '.explosion-byline',
          //       'translateY'  : ['-25%', '-40%'],
          //       'opacity'     : [1, 0] // hack to accelrate opacity speed
          //     }
          //   ]
          // } , {
          //   'wrapper' : '#images',
          //   'duration' : '150%',
          //   'animations' :  [
          //     {
          //       'selector'    : '.images-byline',
          //       'translateY'  : '-25%',
          //       'opacity'     : [0, 1.75] // hack to accelrate opacity speed
          //     } , {
          //       'selector'    : '#mediumHomepage',
          //       'translateY'  : '-90%'
          //     } , {
          //       'selector'    : '.iphone',
          //       'translateY'  : '-66%'
          //     }
          //   ]
          // } , {
          //   'wrapper' : '#images',
          //   'duration' : '75%',
          //   'animations' :  []
          // } , {
          //   'wrapper' : '#images',
          //   'duration' : '150%',
          //   'animations' :  [
          //     {
          //       'selector'    : '.images-byline',
          //       'translateY'  : ['-25%', '-25%'],
          //       'scale'       : .7,
          //       'opacity'     : [1.75, -.75] // hack to accelrate opacity speed
          //     } , {
          //       'selector'    : '.images-byline-2',
          //       'opacity'     : [0, 1],
          //       'translateY'  : '-15%'
          //     } , {
          //       'selector'    : '#mediumHomepage',
          //       'translateY'  : ['-90%', '-90%'],
          //       'scale'       : .8,
          //       'opacity'     : -.75
          //     } , {
          //       'selector'    : '.iphone',
          //       'translateY'  : ['-66%', '-90%'],
          //       'translateX'  : '-2%',
          //       'rotate'      : -90,
          //       'scale'       : 1.3
          //     } , {
          //       'selector'    : '#medium-profile-iphone',
          //       'scale'       : .9,
          //       'translateX'  : '20%',
          //     } , {
          //       'selector'    : '#davegamache-dot-com',
          //       'scale'       : [.5, 1]
          //     }
          //   ]
          // } , {
          //   'wrapper' : '#images',
          //   'duration' : '40%',
          //   'animations' :  []
          // } , {
          //   'wrapper' : '#images',
          //   'duration' : '150%',
          //   'animations' :  [
          //     {
          //       'selector'    : '.images-byline-2',
          //       'opacity'     : [1, .5],
          //       'translateY'  : ['-15%', '50%'],
          //       'opacity'     : [1, -2]
          //     } , {
          //       'selector'    : '.iphone',
          //       'translateY'  : ['-90%', '5%'],
          //       'translateX'  : ['-2%', '-2%'],
          //       'rotate'      : [-90, -90],
          //       'scale'       : [1.3, 1.3]
          //     } , {
          //       'selector'    : '#medium-profile-iphone',
          //       'translateX'  : ['20%', '20%']
          //     } , {
          //       'selector'    : '#davegamache-dot-com',
          //       'scale'       : [1, 1]
          //     }
          //   ]
          // } , {
          //   'wrapper' : '#links',
          //   'duration' : '100%',
          //   'animations' :  [
          //     {
          //       'selector'    : '#links',
          //       'opacity'     : [0, 2],
          //       'scale'       : [.8, 1]
          //     } , {
          //       'selector'    : '.twitter',
          //       'opacity'     : [0, 1]
          //     }
          //   ]
          // } , {
          //   'duration' : '100%',
          //   'animations' :  []
          // }
        ];

    /*  Construction
    -------------------------------------------------- */
    var init = function() {

      if ($window.width() >= 1280 && $window.height() >= 600) {
        scrollIntervalID = setInterval(updatePage, 10); //default = 10
        setupValues();
      }

      $window.resize(throwError);
      if(isTouchDevice) {
        $window.resize(throwError);
      }
    };

    var setupValues = function() {
      scrollTop = $window.scrollTop();
      windowHeight = $window.height();
      windowWidth = $window.width();
      convertAllPropsToPx();
      buildPage();
    };

    var buildPage = function() {
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

    var convertAllPropsToPx = function() {
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

    var getDefaultPropertyValue = function(property) {
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
      value = +value.toFixed(5) 
      // TEMPORARILY REMOVED CAUSE SCALE DOESN'T WORK WITHA AGRESSIVE ROUNDING LIKE THIS
      return value;
    };

    easeInOutQuad = function (t, b, c, d) {
      //sinusoadial in and out
      return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
    };

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

    isTouchDevice = function() {
      return 'ontouchstart' in window || 'onmsgesturechange' in window; // works on ie10
    };

    init();

  });
}).call(this);