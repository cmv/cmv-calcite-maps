/* global module */
module.exports = function (grunt) {

    // grunt task config
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        tag: {
            banner: '/*  <%= pkg.name %>\n' +
                ' *  version <%= pkg.version %>\n' +
                ' *  Project: <%= pkg.homepage %>\n' +
                ' */\n'
        },
        copy: {
            build: {
                src: ['**', '!cmv/**', '!node_modules/**', '!tests/**', '!package.json', '!gruntfile.js'],
                dest: 'dist',
                expand: true
            }
        },
        clean: {
            build: {
                src: ['dist']
            }
        },
        postcss: {
            build: {
                expand: true,
                cwd: 'dist/widgets',
                src: ['widgets/**/*.css'],
                dest: 'dist/widgets'
            }
        },
        cssmin: {
            build: {
                expand: true,
                cwd: 'dist',
                src: ['**/*.css'],
                dest: 'dist'
            }
        },

        csslint: {
            build: {
                src: ['widgets/**/*.css'],
                options: {
                    csslintrc: '.csslintrc'
                }
            }
        },

        eslint: {
            build: {
                src: ['widgets/**/*.js', 'config/**/*.js'],
                options: {
                    eslintrc: '.eslintrc'
                }
            }
        },

        uglify: {
            build: {
                files: [{
                    expand: true,
                    cwd: 'dist',
                    src: ['**/*.js', '!**/config/**', '!**/cmv/**'],
                    dest: 'dist',
                    ext: '.js'
                }],
                options: {
                    banner: '<%= tag.banner %>',
                    sourceMap: true,
                    sourceMapIncludeSources: true,
                    compress: {
                        'drop_console': false
                    }
                }
            }
        },

        watch: {
            dev: {
                files: ['widgets/**'],
                tasks: ['eslint', 'csslint']
            },
            build: {
                files: ['widgets/**'],
                tasks: ['eslint', 'csslint']
            }
        },

        connect: {
            dev: {
                options: {
                    port: 3000,
                    base: '.',
                    hostname: '*',
                    protocol: 'https',
                    keepalive: true
                }
            },
            build: {
                options: {
                    port: 3001,
                    base: 'dist/viewer',
                    hostname: '*',
                    protocol: 'https',
                    keepalive: true
                }
            }
        },
        open: {
            'dev_browser': {
                path: 'https://localhost:3000/demo.html'
            },
            'build_browser': {
                path: 'https://localhost:3001/demo.html'
            }
        },
        compress: {
            build: {
                options: {
                    archive: 'dist/cmv-calcite-maps.zip'
                },
                files: [{
                    expand: true,
                    cwd: 'dist',
                    src: ['**', '!**/dijit.css']
                }]
            }
        }
    });

    // load the tasks
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-contrib-compress');

    // define the tasks
    grunt.registerTask('default', 'Watches the project for changes, automatically builds them and runs a web server and opens default browser to preview.', ['eslint', 'csslint', 'connect:dev', 'open:dev_browser', 'watch:dev']);
    grunt.registerTask('build', 'Compiles all of the assets and copies the files to the build directory.', ['clean', 'copy', 'scripts', 'stylesheets', 'compress:build']);
    grunt.registerTask('build-view', 'Compiles all of the assets and copies the files to the build directory starts a web server and opens browser to preview app.', ['clean', 'copy', 'scripts', 'stylesheets', 'compress:build', 'connect:build', 'open:build_browser', 'watch:build']);
    grunt.registerTask('scripts', 'Compiles the JavaScript files.', ['eslint', 'uglify']);
    grunt.registerTask('stylesheets', 'Auto prefixes css and compiles the stylesheets.', ['csslint', 'postcss', 'cssmin']);
    grunt.registerTask('lint', 'Run simple eslint and csslint.', ['eslint', 'csslint']);
};