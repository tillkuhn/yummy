/*jslint node: true */
'use strict';

var pkg = require('./package.json');

//Using exclusion patterns slows down Grunt significantly
//instead of creating a set of patterns like '**/*.js' and '!**/node_modules/**'
//this method is used to create a set of inclusive patterns for all subdirectories
//skipping node_modules, bower_components, dist, and any .dirs
//This enables users to create any directory structure they desire.
var createFolderGlobs = function(fileTypePatterns) {
    fileTypePatterns = Array.isArray(fileTypePatterns) ? fileTypePatterns : [fileTypePatterns];
    var ignore = ['node_modules', 'bower_components', 'dist', 'temp'];
    var fs = require('fs');
    return fs.readdirSync(process.cwd())
        .map(function(file) {
            if (ignore.indexOf(file) !== -1 ||
                file.indexOf('.') === 0 || !fs.lstatSync(file).isDirectory()) {
                return null;
            } else {
                return fileTypePatterns.map(function(pattern) {
                    return file + '/**/' + pattern;
                });
            }
        })
        .filter(function(patterns) {
            return patterns;
        })
        .concat(fileTypePatterns);
};

module.exports = function(grunt) {

    // load all grunt tasks
    grunt.loadNpmTasks('grunt-execute');
    grunt.loadNpmTasks('grunt-coveralls');
    //grunt.loadNpmTasks('grunt-template-jasmine-istanbul');
    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({
        connect: {
            main: {
                options: {
                    port: 9001
                }
            }
        },
        watch: {
            main: {
                options: {
                    livereload: true,
                    spawn: false
                },
                files: [createFolderGlobs(['*.js', '*.less', '*.html']), '!_SpecRunner.html', '!.grunt'],
                tasks: [] //all the tasks are run dynamically during the watch event handler
            }
        },
        jshint: {
            main: {
                options: {
                    jshintrc: '.jshintrc'
                },
                src: createFolderGlobs(['*.js', '!**/*.spec.js','!lcov-report/*.js'])
            }
        },
        clean: {
            before: {
                src: ['dist', 'temp','lcov-report']
            },
            after: {
                src: ['temp']
            }
        },
        ngtemplates: {
            main: {
                options: {
                    module: pkg.name,
                    htmlmin: '<%= htmlmin.main.options %>'
                },
                src: [createFolderGlobs('*.html'), '!index.html', '!_SpecRunner.html'],
                dest: 'temp/templates.js'
            }
        },
        copy: {
            main: {
                files: [{
                        src: ['favicon.ico', 'img/**', 'resources/**'],
                        dest: 'dist/'
                    },
                    // {src: ['bower_components/font-awesome/fonts/**'], dest: 'dist/',filter:'isFile',expand:true}
                    // flattens results to a single level
                    {
                        expand: true,
                        flatten: true,
                        src: ['bower_components/font-awesome/fonts/**'],
                        dest: 'dist/fonts',
                        filter: 'isFile'
                    }, {
                        expand: true,
                        flatten: true,
                        src: ['bower_components/bootstrap/dist/fonts/**'],
                        dest: 'dist/fonts',
                        filter: 'isFile'
                    }
                ]
            },
            deploy: {
              files: [{
                      src: ['**'],
                      expand: true,
                      cwd: 'dist/',
                      dest: '/tmp/yummy-gh-pages/'
                  } ]

            }
        },
        // Munge munge
        dom_munger: {
            read: {
                options: {
                    read: [{
                        selector: 'script[data-build!="exclude"]',
                        attribute: 'src',
                        writeto: 'appjs'
                    }, {
                        selector: 'link[rel="stylesheet"]',
                        attribute: 'href',
                        writeto: 'appcss'
                    }]
                },
                src: 'index.html'
            },
            update: {
                options: {
                    remove: ['script[data-remove!="exclude"]', 'link'],
                    append: [{
                        selector: 'body',
                        html: '<script src="app.full.min.js"></script>'
                    }, {
                        selector: 'head',
                        html: '<link rel="stylesheet" href="css/app.full.min.css">'
                    }, {
                        selector: 'head',
                        html: '<link rel="shortcut icon" type="image/x-icon" href="favicon.ico">'
                    }]
                },
                src: 'index.html',
                dest: 'dist/index.html'
            }
        },
        cssmin: {
            main: {
                src: ['temp/app.css', '<%= dom_munger.data.appcss %>'],
                dest: 'dist/css/app.full.min.css'
            }
        },
        concat: {
            main: {
                src: ['<%= dom_munger.data.appjs %>', '<%= ngtemplates.main.dest %>'],
                dest: 'temp/app.full.js'
            }
        },
        ngmin: {
            main: {
                src: 'temp/app.full.js',
                dest: 'temp/app.full.js'
            }
        },
        uglify: {
            main: {
                src: 'temp/app.full.js',
                dest: 'dist/app.full.min.js'
            }
        },
        htmlmin: {
            main: {
                options: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeComments: true,
                    removeEmptyAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true
                },
                files: {
                    'dist/index.html': 'dist/index.html'
                }
            }
        },
        jasmine: {
            unit: {
                src: ['<%= dom_munger.data.appjs %>', 'bower_components/angular-mocks/angular-mocks.js'],
                options: {
                    keepRunner: false,
                    specs: createFolderGlobs(['*.spec.js'])
                }
            },
            coverage: {
                src: ['<%= dom_munger.data.appjs %>', 'bower_components/angular-mocks/angular-mocks.js'],
                options: {
                    specs: createFolderGlobs(['*.spec.js']),
                    keepRunner: false,
                    template: require('grunt-template-jasmine-istanbul'),
                    templateOptions: {
                        coverage: 'coverage/coverage.json',
                        // see https://github.com/maenu/grunt-template-jasmine-istanbul
                        //report: 'coverage',
                        report: {type: "lcov",options: {} },
                        thresholds: {
                            lines: 20,
                            statements: 20,
                            branches: 10,
                            functions: 15
                        }
                    }
                }
            }
        },

        execute: {
            web: {
                // execute javascript files in a node child_process
                src: ['web.js']
            },
            backup: {
                options: {
                    args: ['arg1', 'arg2']
                },
                src: ['web.js']
            }
        },
        // Code coverage
        coveralls: {
            // Options relevant to all targets
            options: {
                // When true, grunt-coveralls will only print a warning rather than
                // an error, to prevent CI builds from failing unnecessarily (e.g. if
                // coveralls.io is down). Optional, defaults to false.
                force: false
            },

            coverme: {
                // LCOV coverage file (can be string, glob or array)
                src: 'lcov.info',
                options: {
                    // Any options for just this target
                }
            },
        }
    });

    // remove less after clean before
    grunt.registerTask('build', ['jshint', 'clean:before', 'dom_munger', 'ngtemplates', 'cssmin', 'concat', 'ngmin', 'uglify', 'copy:main', 'htmlmin', 'clean:after']);
    grunt.registerTask('serve', ['dom_munger:read', 'jshint', 'connect', 'watch']);
    grunt.registerTask('test', ['dom_munger:read', 'jasmine:unit']);
    grunt.registerTask('web', ['execute:web']);
    grunt.registerTask('coverage', ['dom_munger:read','jasmine:coverage','coveralls']);
    grunt.registerTask('deploy',['build','copy:deploy']);
    grunt.registerTask('default', ['serve']);

    grunt.event.on('watch', function(action, filepath) {
        //https://github.com/gruntjs/grunt-contrib-watch/issues/156

        if (filepath.lastIndexOf('.js') !== -1 && filepath.lastIndexOf('.js') === filepath.length - 3) {

            //lint the changed js file
            grunt.config('jshint.main.src', filepath);
            grunt.task.run('jshint');

            //find the appropriate unit test for the changed file
            var spec = filepath;
            if (filepath.lastIndexOf('.spec.js') === -1 || filepath.lastIndexOf('.spec.js') !== filepath.length - 8) {
                spec = filepath.substring(0, filepath.length - 3) + '.spec.js';
            }

            //if the spec exists then lets run it
            if (grunt.file.exists(spec)) {
                grunt.config('jasmine.unit.options.specs', spec);
                grunt.task.run('jasmine:unit');
            }
        }

        //if index.html changed, we need to reread the <script> tags so our next run of jasmine
        //will have the correct environment
        if (filepath === 'index.html') {
            grunt.task.run('dom_munger:read');
        }

    });
};
