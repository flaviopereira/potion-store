'use strict';

var gulp = require('gulp');
// var sass = require('node-sass');
// var rename = require('gulp-rename');
// var replace = require('gulp-replace');
// var zip = require('gulp-zip');
var rimraf = require('gulp-rimraf');
var minify = require('gulp-minify');
var htmlmin = require('gulp-htmlmin');

// gulp.task('build', ['images'], function() {
//   var css = sass.renderSync({
//     file: 'template/scss/styles.scss'
//   });
//
//   gulp.src('template/screenshot.jpg').pipe(gulp.src('build'));
//   return gulp.src('template/responsive.html')
//     .pipe(replace('/* INSERT_CSS_HERE */', css))
//     .pipe(rename('index.html'))
//     .pipe(gulp.dest('build'));
// });

gulp.task('clean', function() {
  return gulp.src('public/dist', {
      read: false
    })
    .pipe(rimraf());
});

gulp.task('compress', ['clean'], function() {
  return gulp.src('public/src/js/*.js')
    .pipe(minify())
    .pipe(gulp.dest('public/dist/js'));
});

gulp.task('images', ['compress'], function() {
  return gulp.src('public/src/img/*')
    .pipe(gulp.dest('public/dist/img'));
});

gulp.task('minify', ['images'], function() {
  return gulp.src('public/src/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('public/dist'));
});

gulp.task('default', ['clean', 'compress', 'images', 'minify'], function() {
  return gulp.watch('public/src/**', ['clean', 'compress', 'images', 'minify']);
});
