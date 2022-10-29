var gulp = require("gulp");
var sass = require('gulp-sass')(require('sass'));
var concat = require('gulp-concat');
var zip = require('gulp-zip')
var browserSync = require('browser-sync').create();

// Specific Task
function js() {
  return gulp
    .src([
      './node_modules/bootstrap/dist/js/bootstrap.min.js',
      './node_modules/jquery/dist/jquery.min.js',
      './node_modules/popper.js/dist/umd/popper.min.js',
      './dist/SchoolSocialNetwork/*.js'
    ])
    .pipe(zip('js.gz'))
    .pipe(gulp.dest('./dist/SchoolSocialNetwork/js'))
    .pipe(browserSync.stream());
}
gulp.task(js);

// Specific Task
function gulpSass() {
  return gulp
    .src(['./src/assets/sass/**/*.*'])
    .pipe(zip('scss.gz'))
    .pipe(gulp.dest('./dist/SchoolSocialNetwork/css'))
    .pipe(browserSync.stream());
}
gulp.task(gulpSass);

// Run multiple tasks
gulp.task('default', gulp.series(js, gulpSass));
