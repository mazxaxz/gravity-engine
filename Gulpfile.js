const gulp = require('gulp');

const babel = require('gulp-babel');
const minify = require('gulp-babel-minify');
const concat = require('gulp-concat');
const concatCss = require('gulp-concat-css');
const cleanCss = require('gulp-clean-css');

gulp.task('bundle', () => {
  return gulp
    .src([
      'src/js/definitions.js',
      'src/js/models/Object.js',
      'src/js/models/!(Object)*.js',
      'src/js/!(definitions)*.js'
    ])
    // .pipe(babel({
    //   presets: ['env']
    // }))
    .pipe(concat('bundle.js'))
    .pipe(minify())
    .pipe(gulp.dest('dist'));
});

gulp.task('mincss', () => {
  return gulp
    .src(['src/css/**/*.css'])
    .pipe(concatCss('style.min.css'))
    .pipe(cleanCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist'));
});
