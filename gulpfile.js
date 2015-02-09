var gulp    = require('gulp'),
	usemin    = require('gulp-usemin'),
	uglify    = require('gulp-uglify'),
	minifyCSS = require('gulp-minify-css'),
	rev       = require('gulp-rev'),
	rename    = require('gulp-rename'),
	header    = require('gulp-header'),
	rimraf    = require('gulp-rimraf');

// clean
gulp.task('clean', ['add-headers'], function() {
	return gulp.src(['css-build','js-build'], {read: false})
		.pipe(rimraf());
});

// fix position and add headers
gulp.task('add-headers', ['usemin'], function() {
  gulp.src('./src/*.src.tpl')
	.pipe(rimraf())
	.pipe(rename(function(path) {
		path.basename = path.basename.replace(/([^.src]+).src$/, '$1');
	}))
	.pipe(rimraf())
	.pipe(header('<!-- This Tpl file is generated, do not edit by hand! -->\n'))

	.pipe(gulp.dest('./src/templates/'));

  gulp.src('./css-build/*.css')
  	.pipe(rimraf())
  	.pipe(header('/* This CSS file is generated, do not edit by hand! */\n'))
  	.pipe(gulp.dest('./src/css-build'));

  gulp.src('./js-build/*.js')
  	.pipe(rimraf())
  	.pipe(header('/* This JS file is generated, do not edit by hand! */\n'))
  	.pipe(gulp.dest('./src/js-build/'));
});

// code deployment
gulp.task('usemin', function() {

  return gulp.src('./src/templates/*.tpl')
		.pipe(usemin({
			'assetsDir': '/var/www/gulp-code-deployment/src/',
		  'css': [minifyCSS(), rev()],
		  'js': [uglify(), rev()]
		}))
		.pipe(gulp.dest('./src/'));
});

// default task
gulp.task('default',['usemin','add-headers', 'clean'] );
