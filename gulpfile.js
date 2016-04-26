var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css'); // minify css files
var concatCss = require('gulp-concat-css'); // merge css files together
var sass = require('gulp-sass'); // sass for gulp
var imagemin = require('gulp-imagemin'); // image optimization
var pngquant = require('imagemin-pngquant'); // bundled with imagemin

gulp.task('default', function(){
    console.log("It's me, your friend, gulp? Wanna go bowling?");
});

// neemt taak van sass over: pakt de master sass file, verkleint en verplaatst deze + minify
gulp.task('sass', function(){
  return gulp.src('assets/sass/style.scss')
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(cleanCSS({compatibility: 'ie8'})) // minify
    .pipe(gulp.dest('build/css'));
});

// image minify
gulp.task('image-minify', function(){
  return gulp.src('assets/img/*')
    .pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))
    .pipe(gulp.dest('build/img'));
});

// watch for changes
gulp.task('watch', function(){
    gulp.watch('assets/sass/**/*.scss', ['sass']);
    gulp.watch('assets/img/*', ['image-minify']);
});

// gulp livereload
// https://github.com/vohof/gulp-livereload