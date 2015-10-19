module.exports = function(grunt) {

  // configure the tasks
  grunt.initConfig({

    copy: {
      build: {
        cwd: 'src',
        src: [
          '**', '!**/*.styl', '!**/*.coffee', '!**/*.jade', '!partials',
          '!**/*test.js.coffee'
        ],
        dest: 'build',
        expand: true
      },
    },

    clean: {
      build: {
        src: [ 'build' ]
      },
      stylesheets: {
        src: [ 'build/**/*.css', 'build/**/*.scss', '!build/application.css' , 'build/**/*.map']
      },
      scripts: {
        src: [ 'build/**/*.js.coffee', '!build/application.js' ]
      },
    },

    sass: {
      dist: {
        files: {
          'build/app.css' : ['build/**/*.scss']
        }
      }
    },

    cssmin: {
      build: {
        files: {
          'build/application.css': [ 'build/**/*.css' ]
        }
      }
    },

    coffee: {
      build: {
        expand: true,
        cwd: 'build',
        src: [ '**/*.js.coffee', '!**/*test.js.coffee' ],
        dest: 'build',
        ext: '.js'
      }
    },

    ngClassify: {
      app: {
          files: [
              {
                  cwd: 'src',
                  src: [ '**/*.js.coffee' ],
                  dest: 'build',
                  expand: true
              }
          ],
          options: {
              appName: 'rntJuncApp'
          }
      }
    },

    uglify: {
      build: {
        options: {
          mangle: false
        },
        files: [{
          expand: true,
          cwd: 'build/app',
          src: '**/*.js',
          dest: 'build/app'
        }]
      }
    },

    jade: {
      compile: {
        options: {
          data: {}
        },
        files: [{
          expand: true,
          cwd: 'src',
          src: [ '**/*.html.jade', '!**/_*.html.jade' ],
          dest: 'build',
          ext: '.html'
        }]
      }
    },

    watch: {
      options: {
        livereload: true,
      },
      stylesheets: {
        files: ['src/**/*.css', 'src/**/*.scss'],
        tasks: [ 'stylesheets' ]
      },
      scripts: {
        files: 'src/**/*.coffee',
        tasks: [ 'scripts' ]
      },
      jade: {
        files: 'src/**/*.jade',
        tasks: [ 'jade' ]
      },
      copy: {
        files: [ 'src/**', '!src/**/*.styl', '!src/**/*.coffee', '!src/**/*.jade' ],
        tasks: [ 'copy' ]
      }
    },

    connect: {
      server: {
        options: {
          port: 4000,
          base: 'build',
          hostname: '0.0.0.0'
        }
      }
    }

  });

  // load the tasks
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-ng-classify');

  // define the tasks
  grunt.registerTask(
    'scripts', 
    'Compiles the JavaScript files.', 
    [ 'ngClassify', 'coffee', 'clean:scripts', 'uglify']
  );

  grunt.registerTask(
    'stylesheets', 
    'Compiles the stylesheets.', 
    [ 'sass' , 'cssmin', 'clean:stylesheets' ]
  );

  grunt.registerTask(
      'build', 
      'Compiles all of the assets and copies the files to the build directory.', 
      [ 'clean:build', 'copy', 'stylesheets', 'scripts', 'jade']
    );

  grunt.registerTask(
    'serve', 
    'Watches the project for changes, automatically builds them and runs a server.', 
    [ 'build', 'connect', 'watch' ]
  );
};