// Generated 
'use strict';
module.exports = function (grunt) {
  grunt.initConfig({
    // Project settings
    tu: {
      // Configurable paths
      app: 'app',
      dist: 'dist'
    },
    // Watches files for changes and runs tasks based on the changed files
    watch: {
      coffee: {
        files: ['<%= tu.app %>/coffee/{,*/}*.{coffee,litcoffee,coffee.md}'],
        tasks: ['coffee:app']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      compass: {
        files: ['<%= tu.app %>/scss/{,*/}*.{scss,sass}'],
        tasks: ['compass:app']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= tu.app %>/{,*/}*.html',
          '<%= tu.app %>/css/{,*/}*.css',
          '<%= tu.app %>/js/{,*/}*.js',
          '<%= tu.app %>/img/{,*/}*.{gif,jpeg,jpg,png,svg,webp}'
        ]
      }
    },
    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        // Change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          open: true,
          base: [
            '<%= tu.app %>',
            '<%= tu.app %>'
          ]
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%= tu.dist %>',
          livereload: false
        }
      }
    },
    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '<%= tu.dist %>/*',
            '!<%= tu.dist %>/.git*'
          ]
        }]
      },
      app: {
        files: [{
          dot: true,
          src: [
            '<%= tu.app %>/js/*',
            '<%= tu.app %>/css/*',
            '<%= tu.app %>/.sass-cache/*',
            '!<%= tu.app %>/.git*'
          ]
        }]
      },
    },
    // Compiles CoffeeScript to JavaScript
    coffee: {
      app: {
        files: [{
          expand: true,
          cwd: '<%= tu.app %>/coffee',
          src: '{,*/}*.{coffee,litcoffee,coffee.md}',
          dest: '<%= tu.app %>/js',
          ext: '.js'
        }]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= tu.app %>/coffee',
          src: '{,*/}*.{coffee,litcoffee,coffee.md}',
          dest: '<%= tu.dist %>/js',
          ext: '.js'
        }]
      }
    },
    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      app: { // Target
        options: { // Target options
          sassDir: '<%= tu.app %>/scss',
          cssDir: '<%= tu.app %>/css',
          debugInfo: true
        }
      },
      dist: { // Target
        options: { // Target options
          sassDir: '<%= tu.app %>/scss',
          cssDir: '<%= tu.dist %>/css',
          environment: 'production'
        }
      }
    },
    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= tu.app %>',
          dest: '<%= tu.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            'img/{,*/}*.webp',
            '{,*/}*.html',
            'styles/fonts/{,*/}*.*'
          ]
        }]
      },
      css: {
        expand: true,
        dot: true,
        cwd: '<%= tu.app %>/css',
        dest: '<%= tu.dist %>/css/',
        src: '{,*/}*.css'
      }
    },
    // Run some tasks in parallel to speed up build process
    concurrent: {
      app: [
        'compass:app',
        'coffee:app',
        'copy:css'
      ],
      dist: [
        'coffee',
        'compass',
        'copy:css'
      ]
    }

  });

  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }
    grunt.task.run([
      'clean:app',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', function () {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve']);
  });
  grunt.registerTask('build', [
    'clean:dist',
    'clean:app',
    'copy:dist'
  ]);
  grunt.registerTask('default', [
    'serve'
  ]);

};