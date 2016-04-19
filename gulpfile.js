/**
 * This gulpfile is here just to help to buid the static open source website of Captain Train
 */

var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    less = require('gulp-less'),
    sourcemaps = require('gulp-sourcemaps'),
    cleanCSS = require ('gulp-clean-css'),
    browserSync = require('browser-sync').create(),
    path = {
        root : './',
        lessSrc : './assets/styles/sources/',
        cssDir : './assets/styles/',
    },
    files = {
        html: path.root + '*.html',
        less : path.lessSrc + '*.less'
    };

/**
 * Tasks
 */
gulp.task('css', function() {
    return gulp.src(files.less)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(cleanCSS())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.cssDir))
        .pipe(browserSync.stream());
    });


gulp.task('serve', ['css'], function() {

    browserSync.init({
        server: './'
    });

    gulp.watch(files.less, ['css']);
    gulp.watch(files.html).on('change', browserSync.reload);
});

gulp.task('default', ['serve']);