module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all: [
      '*.js',
      './models/**/*.js',
      './routes/**/*.js',
      './public/**/*.js',
      '!./public/js/vendor/**/*.js'
      ]
    },
    watch: {
      scripts: {
        files: ['./**/*.js'],
        tasks: ['jshint'],
        options: {
          spawn: false,
        },
      },
    },
    csslint: {
      strict: {
        options: {
          import: 2
        },
        src: ['htdocs/css/*.css']
      },
      lax: {
        options: {
          import: false
        },
        src: ['htdocs/css/*.css']
      }
    },
    githooks: {
      all: {
        // Will run the jshint and test:unit tasks at every commit
        'pre-commit': 'jshint:all'
      }
    },
    nodemon: {
      dev: {
          script: './bin/www',
          options: {
              /** Environment variables required by the NODE application **/
              env: {
                PORT: 3000,
                "NODE_ENV": "development",
                "NODE_CONFIG": "dev"
              },
              watch: ["scripts"],
              delay: 300,
              nodeArgs: ['--debug'],
              callback: function (nodemon) {
                  nodemon.on('log', function (event) {
                      console.log(event.colour);
                  });

                  /** Open the application in a new browser window and is optional **/
                  // nodemon.on('config:update', function () {
                  //     // Delay before server listens on port
                  //     setTimeout(function() {
                  //         require('open')('http://127.0.0.1:3000');
                  //     }, 1000);
                  // });

                  /** Update .rebooted to fire Live-Reload **/
                  nodemon.on('restart', function () {
                      // Delay before server listens on port
                      setTimeout(function() {
                          require('fs').writeFileSync('.rebooted', 'rebooted');
                      }, 1000);
                  });
              }
          }
      }
    },
    'node-inspector': {
        custom: {
          options: {
            'web-port': 1337,
            'web-host': 'localhost',
            'debug-port': 5858,
            'save-live-edit': true,
            'no-preload': true,
            'stack-trace-limit': 4,
            'hidden': ['node_modules']
          }
        }
      },
      clean: [
        "./build"
      ],
      copy: {
        main: {
          files: [
            // includes files within path and its sub-directories
            {
              expand: true,
              src: [
                './**',
                '!./build',
                '!./README.md',
                '!./.gitignore',
                '!./Gruntfile.js',
                '!./config.js-sample',
                '!./package.json'
              ],
              dest: 'build/'
            }
          ],
        },
      }

  });


  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-githooks');
  grunt.loadNpmTasks("grunt-nodemon");
  grunt.loadNpmTasks('grunt-node-inspector');

  // Default task(s).
  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('build', ['clean', 'copy']);
  grunt.registerTask('run', ['nodemon']);
  grunt.registerTask('debug', ['node-inspector']);

};
