module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        //Minify JS
        uglify: {
            options: {
                mangle: false
            },
            theme: {
                files: {
                    'static/deploy/theme.min.js': [
                        'static/js/index.js',
                        'static/plugins/jquery-ui/jquery-ui-1.10.1.custom.min.js',
                        'static/plugins/jquery.validate/jquery.validate.min.js',
                        'static/plugins/bootstrap-modal.js',
                        'static/plugins/bootstrap-modalmanager.js',
                        'static/plugins/jquery.noty-2.3.8/js/noty/packaged/jquery.noty.packaged.min.js',
                        'static/plugins/jquery.fancybox/source/jquery.fancybox.js',
                        'static/plugins/waypoint/lib/jquery.waypoints.min.js',
                        'static/plugins/handlebars-v4.0.5.js',
                        'static/plugins/jquery.lazyload.min.js',
                        '../../static/sdk/js/cloudinary/jquery.cloudinary.js',
                        '../../static/sdk/js/common.js',
                        '../../static/sdk/js/blog.js',
                        '../../static/sdk/js/article.js',
                        '../../static/sdk/js/search.js',
                        '../../static/sdk/js/disqus.js',
                        '../../static/sdk/js/video-player.js',
                        '../../static/sdk/js/user-articles.js',
                        '../../static/sdk/js/follow.js',
                        '../../static/sdk/js/login.js',
                        '../../static/sdk/js/image.js',
                        '../../static/sdk/js/uploadfile.js',
                        '../../static/sdk/js/yii/yii.js',
                        '../../static/sdk/js/yii/yii.captcha.js',
                        '../../static/sdk/js/media-player/mediaelement-and-player.min.js',
                        'static/development/js/_article-templates.js',
                        'static/development/js/common.js',
                        'static/development/js/home.js',
                        'static/development/js/search.js',
                        'static/development/js/user-articles.js',
                        'static/development/js/auth.js'
                    ]
                }
            }
        },
        cachebreaker: {
            theme: {
                options: {
                    match: ['theme.min.js', 'theme.gz.js', 'output.min.css', 'output.gz.css']
                },
                files: {
                    src: [
                        'layouts/partials/_javascript.twig',
                        'layouts/main.twig'
                    ]
                }
            }
        },
        //Minify Css Files
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            theme: {
                files: {
                    'static/deploy/output.min.css' : [
                        'static/plugins/jquery.fancybox/source/jquery.fancybox.css',
                        'static/plugins/jquery.noty-2.3.8/demo/animate.css',
                        '../../static/sdk/js/media-player/mediaelementplayer.css',
                        'static/css/index.css'
                    ]
                }
            }
        },
        //compress
        compress: {
            main: {
                options: {
                  mode: 'gzip'
                },
                files: [
                    {
                        expand: true, 
                        src: ['static/deploy/*.min.js'], 
                        ext: '.gz.js'
                    },
                    {
                        expand: true, 
                        src: ['static/deploy/*.min.css'], 
                        ext: '.gz.css'
                    }
                ]
            }
        }
    });
    
    //grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-cache-breaker');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-compress');
    
    // Default task(s).
    grunt.registerTask('default', ['uglify', 'cssmin', 'compress', 'cachebreaker']);
};