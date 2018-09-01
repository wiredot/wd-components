'use strict';

var gulp = require('gulp'),
	concat = require('gulp-concat'),
	sourcemaps = require('gulp-sourcemaps'),
	notify = require('gulp-notify'),
	plumber = require('gulp-plumber'),
	autoprefixer = require('autoprefixer'),
	postcss = require('gulp-postcss'),
	sass = require('gulp-sass');

gulp.task('default', ['examples']);

gulp.task('examples', ['examples-scss']);

gulp.task('watch', function() {
	gulp.watch( 'examples/src/scss/**/*.scss', ['scss']);
});

gulp.task('scss', ['examples-scss']);

gulp.task('examples-scss', function() {
	var plugins = [
        autoprefixer()
    ];
	return gulp.src( 'examples/src/scss/*.scss')
		.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
		.pipe(sourcemaps.init())
		.pipe(concat('wd-components.css'))
		.pipe(sass())
		.pipe(postcss(plugins))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest( 'examples/dist/css') )
		.pipe(notify({
			message: 'CSS generated',
			title: 'WD Components'
		}));
});