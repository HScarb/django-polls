var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');

var appPath     = 'frontend/'

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', appPath + 'static/scss/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest(appPath + "static/css"))
        .pipe(browserSync.stream());
});

// Move the javascript files into our /static/js folder
gulp.task('js', function() {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js'])
        .pipe(gulp.dest(appPath + "static/js"))
        .pipe(browserSync.stream());
});

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: appPath + "templates"
    });

    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', appPath + 'static/scss/*.scss'], ['sass']);
    gulp.watch(appPath + "templates/*.html").on('change', browserSync.reload);
});

gulp.task('default', ['js','serve']);