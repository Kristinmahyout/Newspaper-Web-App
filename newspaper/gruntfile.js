/* jshint node: true */
'use strict';

let babel = require('rollup-plugin-babel'),
    commonjs = require('rollup-plugin-commonjs'),
    includePaths = require('rollup-plugin-includepaths'),
    jsSrc = [
        'client/js/*.js',
        'client/js/**/*.js',
        '!client/js/build/*.js'
    ],
    jsMain = [
        // Main application files
        'client/js/**/app.js',
        '!client/js/build/*.js'
    ],
    jsLibs = [
        'node_modules/jquery/dist/jquery.js',
        'node_modules/babel-polyfill/dist/polyfill.js',
        'node_modules/js-cookie/src/js.cookie.js',
        'client/js/build/app.js'
    ],
    sassIncludes = [];

module.exports = (grunt) => {
    grunt.initConfig({
        clean: {
            js: 'client/js/build/*',
            all: [
                'client/js/build/*'
                'client/css/app.css',
                'client/css/app.css.map'
            ]
        },
        jshint: {
            options: {
                esversion: 6
            },
            all: {
                src:jsSrc
            }
        },
        concat: {
            js: {
                src: jsMain,
                dest: 'client/js/build/temp.js'
            },
            all: {
                src: jsLibs,
                dest: 'client/js/build/app.js'
            }
        },
        rollup: {
            dev: {
                options: {
                    format: 'es',
                    plugins: function () {
                        return [
                            includePaths({
                                paths: jsMain
                            })
                        ];
                    }
                },
                files: [{
                    src: 'client/js/build/temp.js', // May only contain 1 src.
                    dest: 'client/js/build/app.js',
                }]
            },
            build: {
                options: {
                    format: 'es',
                    sourceMap: true,
                    plugins: function () {
                        return [
                            includePaths({
                                paths: jsMain
                            }),
                            babel({
                                compact: false
                            })
                        ];
                    }
                },
                files: [{
                    src: 'client/js/build/temp.js', // May only contain 1 src.
                    dest: 'client/js/build/app.js',
                }]
            }

        },
        sass: {
            dev: {
                options: {
                    outputStyle: 'nested',
                    sourceMap: false,
                    includePaths: sassIncludes
                },
                files: {
                    'client/css/app.css': 'client/scss/app.scss'
                }
            },
            prod: {
                options: {
                    outputStyle: 'compressed',
                    sourceMap: true,
                    includePaths: sassIncludes
                },
                files: {
                    'client/css/app.css':  'client/scss/app.scss'
                }
            }
        },
        watch: {
            livereload: {
                options: {
                    livereload: true
                },
                files: [
                    'client/js/build/app.js',
                    'css/**/*.css',
                    '*.html'
                ]
            },
            js: {
                tasks: ['dev'],
                files: jsMain
            },
            sass: {
                tasks: ['sass:dev'],
                files: []
            }
        },
        uglify: {
            options: {
                // Causes errors when "true"
                mangle: false
            },
            app: {
                files: {
                    'client/js/build/app.min.js': 'client/js/build/app.js'
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-livereload');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-rollup');
    grunt.loadNpmTasks('grunt-newer');
    grunt.registerTask('dev',
        "Join and rollup all the ES6, but don't transpile.", ['jshint:all', 'clean:js', 'concat:js', 'rollup:dev', 'concat:all']
    );
    grunt.registerTask('build',
        "Join, rollup, transpile, and uglify static JavaScript assets", ['jshint:all', 'clean:all', 'concat:js', 'rollup:build', 'concat:all',
         'uglify:main']
    );
    grunt.registerTask('code', ['dev', 'watch']);
};
