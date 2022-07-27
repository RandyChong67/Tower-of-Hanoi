var gulp = require('gulp'),
    gulp_less = require('gulp-less'),
    gulp_auto_prefixer = require('gulp-autoprefixer');

//Creating a Style task that convert LESS to CSS

gulp.task('styles', function () {
    var src_file = 'style.less',
        temp = './style';
    return gulp
        .src(src_file)
        .pipe(gulp_less())
        .pipe(gulp_auto_prefixer({browsers: ['last 2 versions', '>5%']}))
        .pipe(gulp.dest(temp));
});