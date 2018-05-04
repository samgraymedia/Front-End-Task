var gulp = require('gulp'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  minify = require('gulp-minify'),
  browserSync = require('browser-sync').create();


//SASS TASK
gulp.task('styles', () =>
  gulp.src('src/sass/style.sass')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('src/sass/css'))
);

gulp.task('autoprefixer', () =>
  gulp.src('src/sass/css/style.css')
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(gulp.dest('dest/css/'))
  .pipe(browserSync.stream())
);

gulp.task('compress', () =>
  gulp.src('src/js/**/*.js')
  .pipe(minify({
    ext: {
      min: '.min.js'
    },
    exclude: ['tasks'],
    ignoreFiles: ['.combo.js', '-min.js']
  }))
  .pipe(gulp.dest('dest/js'))
);


gulp.task('serve', ['styles'], () =>

  browserSync.init({
    server: "dest"
  }));

gulp.watch('src/sass/**/*.sass', ['styles']);
gulp.watch('src/sass/css/style.css', ['autoprefixer']).on('change', browserSync.reload);
gulp.watch('dest/index.html', []).on('change', browserSync.reload);
gulp.watch('src/js/**/*.js', ['compress']);


gulp.task('default', ['styles', 'autoprefixer', 'compress', 'serve']);