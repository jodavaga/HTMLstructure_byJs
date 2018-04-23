var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var refresh = require('gulp-refresh');
var webserver = require('gulp-webserver');


gulp.task('styles', function() {
    gulp.src('sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./app/css/'))
        .pipe(refresh());
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src(['node_modules/bootstrap/dist/css/bootstrap.min.css', './css/*.css'])
        .pipe(sass())
        .pipe(gulp.dest("./css"))
        .pipe(refresh());
});

// Move the javascript files into our /js folder
gulp.task('js', function() {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/popper.min.js'])
        .pipe(gulp.dest("./app/js"));
});

gulp.task('webserver', function() {
    gulp.src('./app/')
      .pipe(webserver({
        livereload: true,
        directoryListing: {
            enable: true,
            path: 'http://localhost:8000/app/'
          },
        open: true
      }));
  });

//Watch task
gulp.task('watch',function() {
    refresh.listen();
    gulp.watch('sass/**/*.scss',['styles']);
});