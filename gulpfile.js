
// ### BLIND LUNCH ###
// ––––––––––––––––––––––

var gulp = require('gulp');

// ### INCLUDE PLUG-INS ###
// ––––––––––––––––––––––
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var clean = require('gulp-clean');
var livereload = require('gulp-livereload');
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');


// ### CONFIGURATION ###
// ––––––––––––––––––––––
var onError = function (err) {
    gutil.beep();
    gutil.beep();
    gutil.beep();
    gutil.log(gutil.colors.red("Error: ") + err);
};
var config = {
    "folder": {
        "sass" :  "./media/sass/",
        "css"  :  "./media/css/"
    },
    "plumber": {
        errorHandler: onError
    }
};


// ### SASS (compiling) ###
// ––––––––––––––––––––––
gulp.task('sass', function() {
    return gulp.src(config.folder.sass + 'cosmic.scss')
        .pipe(plumber(config.plumber))
        .pipe(sass())
        .pipe(prefix("last 1 version", "> 1%", "ie 8", "ie 7"))
        .pipe(livereload())
        .pipe(gulp.dest(config.folder.css));
});


// ### CLEAN ###
// ––––––––––––––––––––––
gulp.task('clean', function() {
    return gulp.src([
            // config.folder.img+'/**',
            config.folder.css+'/cosmic.css'
        ], {read: false})
        .pipe(clean());
});

// WATCH FILES
// ––––––––––––––––––––––
gulp.task('watch', function() {
    gulp.watch(config.folder.sass+'/**/*.scss', ['sass']);
    // gulp.watch(config.folder.img+'/**', ['images']);
});


gulp.task('dev', ['clean','sass', 'watch']);

// ### RUNNERS ###
// ––––––––––––––––––––––
// The default task (called when you run `gulp`)
gulp.task('default' , function(){
    return gulp.start('dev');
});
