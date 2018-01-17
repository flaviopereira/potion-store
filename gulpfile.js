'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var rimraf = require('gulp-rimraf');
var minify = require('gulp-minify');
var htmlmin = require('gulp-htmlmin');

gulp.task('clean', function() {
  return gulp.src('public/dist', {
      read: false
    })
    .pipe(rimraf());
});

gulp.task('sass', ['clean'], function () {
  return gulp.src('public/src/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('public/dist/css'));
});

gulp.task('compress', ['sass'], function() {
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

gulp.task('default', ['clean', 'sass', 'compress', 'images', 'minify'], function() {
  return gulp.watch('public/src/**', ['clean', 'sass', 'compress', 'images', 'minify']);
});
