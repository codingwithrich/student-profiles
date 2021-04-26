var gulp = require('gulp'),  
pug = require('gulp-pug');
const sass = require('gulp-sass');
const sourceMaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync');

// run this task by typing in gulp pug in CLI
gulp.task('pug', function() {  
  return gulp.src('views/*.pug')
      .pipe(pug()) // pipe to pug plugin
      .pipe(gulp.dest('build')); // tell gulp our output folder
});

function style() {
  return gulp.src('./assets/scss/*.scss')
  .pipe(sourceMaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer())
  .pipe(sourceMaps.write('./'))
  .pipe(gulp.dest('./assets/css'))
  .pipe(browserSync.stream());
}

function watch() {
  browserSync.init({
      server: {
          baseDir: './',
      },
      startPath: './index.html',
      ghostMode: false,
      notify: false
  });
  gulp.watch('./assets/scss/*.scss', style);
  gulp.watch('./*.html').on('change', browserSync.reload);
  gulp.watch('./assets/js/*.js').on('change', browserSync.reload);

}

exports.style = style;
exports.watch = watch;
