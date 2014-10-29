/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['lib/<%= pkg.name %>.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        node:true, // add to remove node undefined error such as 'require' function from stylus config
        globals: {
          "$": true,
          jQuery: true
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      js_test: {
        src: ['dev/scripts/app/reset.js']
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      js_test: {
        files: '<%= jshint.js_test.src %>',
        tasks: ['jshint:js_test']
      },
      js_copy: {
        files: 'dev/scripts/app/*',
        tasks: ['copy'],
        options: {
          livereload: true,
        }
      },
      css: {
        files: ['dev/stylesheets/*.styl', 'dev/stylesheets/*.css'],
        tasks: ['stylus'],
        options: {
          // Start a live reload server on the default port 35729
          livereload: true,
        }
      }
    },
    stylus: { 
      compile: {
        options: {
          'include css': true,
          paths: ['dev/stylesheets/**'],
          urlfunc: 'embedurl',
          linenos: true,
          use: [
            function () {
                      return require('autoprefixer-stylus')({ browsers: 'last 2 version' });
                    },
            //require('csso-stylus') //don't need it anymore
          ]
        },
        files: {
          'public/_assets/c/main.min.css': 'dev/stylesheets/main.styl'
        }
      }
    },
    copy: {
      js: {
        expand: true,
        src: 'dev/scripts/app/*',
        dest: 'public/_assets/j/app/',
        flatten: true
      }
    },
    wiredep: {
      task: {
        src: ['craft/templates/_layout.html']
      },
      options: {
      }
    },
    modernizr: {

        dist: {
            // [REQUIRED] Path to the build you're using for development.
            "devFile" : "bower_components/modernizr/modernizr.js",

            // Path to save out the built file.
            "outputFile" : "public/_assets/j/vendor/modernizr-custom.js",

            // Based on default settings on http://modernizr.com/download/
            "extra" : {
                "shiv" : true,
                "printshiv" : false,
                "load" : true,
                "mq" : false,
                "cssclasses" : true
            },

            // Based on default settings on http://modernizr.com/download/
            "extensibility" : {
                "addtest" : false,
                "prefixed" : false,
                "teststyles" : false,
                "testprops" : false,
                "testallprops" : false,
                "hasevents" : false,
                "prefixes" : false,
                "domprefixes" : false,
                "cssclassprefix": ""
            },

            // By default, source is uglified before saving
            "uglify" : true,

            // Define any tests you want to implicitly include.
            "tests" : [],

            // By default, this task will crawl your project for references to Modernizr tests.
            // Set to false to disable.
            "parseFiles" : true,

            // When parseFiles = true, this task will crawl all *.js, *.css, *.scss and *.sass files,
            // except files that are in node_modules/.
            // You can override this by defining a "files" array below.
            "files" : {
                "src": [
                  'dev/scripts/app/*.js',
                  'dev/stylesheets/*.styl',
                  ]
            },

            // This handler will be passed an array of all the test names passed to the Modernizr API, and will run after the API call has returned
            // "handler": function (tests) {},

            // When parseFiles = true, matchCommunityTests = true will attempt to
            // match user-contributed tests.
            "matchCommunityTests" : false,

            // Have custom Modernizr tests? Add paths to their location here.
            "customTests" : []
        }

    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-stylus'); // + autoprefixer-stylus // + csso-stylus
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks("grunt-modernizr");

  // Default task.
  //grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify', 'stylus']);
  grunt.registerTask('default', ['jshint','stylus']);


};
