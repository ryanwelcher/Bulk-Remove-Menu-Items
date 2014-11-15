module.exports = function(grunt) {

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		 copy: {
            dist: {
                src: 'readme.txt',
                dest: 'README.md'
            }
        },

        makepot: {
            target: {
                options: {
                	domainPath: 'lang',
                	cwd : './',
                    type: 'wp-plugin',
                    exclude : ['classes/class-walker-nav-menu-edit-advanced.php']
                }
            }
        },
        jshint: {
            files: [
                'js/brmi-admin.js',
            ],
            options: {
                expr: true,
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },
        uglify: {
            dist: {
                options: {
                    banner: '/*! <%= pkg.name %> <%= pkg.version %> awpm-admin.min.js <%= grunt.template.today("yyyy-mm-dd h:MM:ss TT") %> */\n',
                },
                files: {
                    'js/brmi-admin.min.js' : [
                        'js/brmi-admin.js'
                    ]
                }
            },
        },

        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint', 'uglify']
        }
    });
 
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-wp-i18n');
 
    grunt.registerTask('default', [
        'jshint',
        'uglify:dist',
        'makepot',
        'copy'
    ]);
}