// var sass        = require('gulp-sass');
// var autoprefixer = require('gulp-autoprefixer');
// var concat      = require('gulp-concat');
// var sourcemaps  = require('gulp-sourcemaps');
// let babel       = require('gulp-babel');

var gulp        = require('gulp');
var rigger      = require('gulp-rigger');
var browserSync = require('browser-sync');
var uglify      = require('gulp-uglify');
var plumber     = require('gulp-plumber');
var rename      = require("gulp-rename");
var webpack     = require('gulp-webpack');
var reload      = browserSync.reload;

var paths = {
    src: {
        dir: './src/',
        jsDir: 'js/**/*',
        js: 'js/main.js',
        htmlDir: 'pages/**/*.html',
        html: 'pages/index.html'
    },

    dist: {
        dir: './dist/',
        jsFile: 'apiac.js'
    }
};

gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: paths.dist.dir
        },
        port: 8080,
        open: true,
        notify: false
    });
});

gulp.task('js', function () {
    gulp.src(paths.src.dir + paths.src.js)
        .pipe(plumber())
        .pipe(webpack({
            output: {
                library: 'bridge'
            }
        }))
        .pipe(rename(paths.dist.jsFile))
        .pipe(gulp.dest(paths.dist.dir))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest(paths.dist.dir))
        .pipe(plumber.stop())
        .pipe(reload({stream:true}));
});


gulp.task('html_build', function () {
    gulp.src(paths.src.dir + paths.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(paths.dist.dir))
        .pipe(reload({stream: true}));
});

gulp.task('watcher',function(){
    gulp.watch(paths.src.dir + paths.src.jsDir, ['js']);
    gulp.watch(paths.src.dir + paths.src.htmlDir, ['html_build']);
});

gulp.task('default', [ 'js', 'html_build']);
