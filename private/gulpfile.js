var gulp = require('gulp'),
    gulp_less = require('gulp-less');

//Creating a Style task that convert LESS to CSS
gulp.task('styles', function () {
    var src_file = '../public/style.less',
        temp = './style';
    return gulp
        .src(src_file)
        .pipe(gulp_less())
        .pipe(gulp.dest(temp));
});