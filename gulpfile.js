const { src, dest, series } = require('gulp');
const clean = require('gulp-clean');
const concat = require('gulp-concat');

function cleanTask(cb) {
  return src('dist/', { read: false, allowEmpty: true })
    .pipe(clean());
}

function styleTask(cb) {
  return src('src/css/*')
    .pipe(concat('all-styles.css'))
    .pipe(dest('dist/css'));
}

function jsTask(cb) {
  return src('src/js/*')
    .pipe(concat('all-js.js'))
    .pipe(dest('dist/js'));
}

exports.default = series(cleanTask, styleTask, jsTask);