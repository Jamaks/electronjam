var gulp = require('gulp');
var del=require('del');
var mainBowerFiles = require('main-bower-files');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var bower = require('gulp-bower');
var cssnano = require('gulp-cssnano');
var watch = require('gulp-watch');
var gulpMultiProcess = require('gulp-multi-process');
var electron = require('electron-connect').server.create();

gulp.task('clean', function (cb) {
    del([
        'dist',
        'public'
    ], cb);
});



gulp.task('vendor-bundle', ['bower-restore'], function () {
    return gulp.src(mainBowerFiles({ filter: '**/*.js' }))
        .pipe(sourcemaps.init())
        .pipe(concat('vendors.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('maps/'))
        .pipe(gulp.dest('public/'));
});
gulp.task('bower-restore', function () {
    return bower();
});
gulp.task('app-bundle', function () {
    return gulp.src(
        [
            'src/js/app.js',
            'src/js/**/*.js'
        ]
        )
        .pipe(sourcemaps.init())
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('maps/'))
        .pipe(gulp.dest('public/'));
});

gulp.task("css", ["bower-restore"], function () {
    return gulp.src(mainBowerFiles({ filter: '**/*.css' }).concat('src/**/*.css'))
        .pipe(sourcemaps.init())
        .pipe(concat('site.min.css'))
        .pipe(cssnano())
        .pipe(sourcemaps.write('maps/'))
        .pipe(gulp.dest('public/'));
});

gulp.task('watch', function () {
     gulp.watch('src/js/app.js', ['app-bundle']);
  
});
gulp.task('serve', function () {
  // Start browser process
  electron.start();

  // Restart browser process
//    gulp.watch('public/*js', electron.restart);

  gulp.watch('public/*js', electron.reload);

    gulp.watch('*.html', electron.reload);

});

gulp.task('reload:renderer', function (done) {
  // Reload renderer process
  electron.reload();
//   setTimeout(function () {
//     electron.broadcast('myNotification');
//     done();
//   });
});
gulp.task('multi-build', function (cb) {
    // task1 and task2 will run in different processes 
  return gulpMultiProcess(['serve', 'watch'], cb);
  
});

gulp.task('build', ['clean','vendor-bundle', 'app-bundle', 'css']);