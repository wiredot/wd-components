'use strict';

var gulp = require('gulp'),
	concat = require('gulp-concat'),
	maps = require('gulp-sourcemaps'),
	notify = require('gulp-notify'),
	plumber = require('gulp-plumber'),
	sass = require('gulp-sass');

gulp.task('default', ['dist', 'examples']);

gulp.task('dist', ['dist-scss']);
gulp.task('examples', ['examples-scss']);

gulp.task('watch', function() {
	gulp.watch( 'src/scss/**/*.scss', ['scss']);
	gulp.watch( 'examples/src/scss/**/*.scss', ['scss']);
});

gulp.task('scss', ['examples-scss', 'dist-scss']);

gulp.task('dist-scss', function() {
	return gulp.src( 'src/scss/*.scss')
		.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
		.pipe(maps.init())
		.pipe(concat('wd-components.css'))
		.pipe(sass())
		.pipe(maps.write('./'))
		.pipe(gulp.dest( 'dist/css') )
		.pipe(notify({
			message: 'CSS generated',
			title: 'WD Components'
		}));
});

gulp.task('examples-scss', function() {
	return gulp.src( 'examples/src/scss/*.scss')
		.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
		.pipe(maps.init())
		.pipe(concat('wd-components.css'))
		.pipe(sass())
		.pipe(maps.write('./'))
		.pipe(gulp.dest( 'examples/css') )
		.pipe(notify({
			message: 'CSS generated',
			title: 'WD Components'
		}));
});