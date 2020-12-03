const { src, dest, series } = require('gulp');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const terser = require('gulp-terser');
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');

function cleanTask(cb) {
  return src('dist/', { read: false, allowEmpty: true })
    .pipe(clean());
}

function copyTask(cb) {
  return src(['src/*', '!src/css', '!src/js', '!src/images'])
    .pipe(dest('dist/'));
}

function styleTask(cb) {
  return src(['src/css/!(colour-changes.css)', 'src/css/colour-changes.css'])
    .pipe(concat('all-styles.min.css'))
    .pipe(sourcemaps.init())
      .pipe(cleanCSS())
    .pipe(sourcemaps.write('../maps'))
    .pipe(dest('dist/css'));
}

function jsTask(cb) {
  return src('src/js/*')
    .pipe(concat('all-js.min.js'))
    .pipe(sourcemaps.init())
      .pipe(terser())
    .pipe(sourcemaps.write('../maps'))
    .pipe(dest('dist/js'));
}

function imagesTask(cb) {
  return src('src/images/*')
    .pipe(imagemin())
    .pipe(dest('dist/images'));
}

exports.default = series(cleanTask, copyTask, styleTask, jsTask, imagesTask);