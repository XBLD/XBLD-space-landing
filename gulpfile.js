'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserify = require('gulp-browserify');
var browserSync = require('browser-sync');
var cssnano = require('gulp-cssnano');
var uglify = require('gulp-uglify');

gulp.task('minify-css', function() {
  return gulp.src('./main.css')
    .pipe(cssnano())
    .pipe(gulp.dest('./'));
});

gulp.task('minify-js', function() {
  return gulp.src('./main.js')
    .pipe(uglify())
    .pipe(gulp.dest('./'));
});

gulp.task('sass', function () {
  return gulp.src('./assets/styles/**/*.scss')
    .pipe(sass({
      includePaths: require('node-bourbon').includePaths
    }).on('error', sass.logError))
    .pipe(cssnano())
    .pipe(gulp.dest('./'))
    .pipe(browserSync.stream());
});

gulp.task('scripts', function() {
  gulp.src('./assets/js/main.js')
    .pipe(browserify({
      insertGlobals: true,
      debug: false
    }))
    .pipe(uglify())
    .pipe(gulp.dest('./'))
    // .pipe(browserSync.reload());
});

gulp.task('minify', ['minify-js', 'minify-css']);

gulp.task('default', function () {
  browserSync.init({
    server: {
      baseDir: './',
      port: 3000
    },
    open: false,
    notify: false
  });
  gulp.watch('./assets/styles/*.scss', ['sass']);
  gulp.watch('./assets/js/*.js', ['scripts']);
  gulp.watch('*.html').on('change', browserSync.reload);
});
