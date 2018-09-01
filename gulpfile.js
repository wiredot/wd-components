'use strict';

var gulp = require('gulp'),
	concat = require('gulp-concat'),
	sourcemaps = require('gulp-sourcemaps'),
	notify = require('gulp-notify'),
	plumber = require('gulp-plumber'),
	autoprefixer = require('autoprefixer'),
	postcss = require('gulp-postcss'),
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
	var plugins = [
		autoprefixer()
	];
	return gulp.src( 'src/scss/*.scss')
		.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
		.pipe(sourcemaps.init())
		.pipe(concat('wd-components.css'))
		.pipe(sass())
		.pipe(postcss(plugins))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest( 'dist/css') )
		.pipe(notify({
			message: 'CSS generated',
			title: 'WD Components'
		}));
});

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
		.pipe(gulp.dest( 'examples/css') )
		.pipe(notify({
			message: 'CSS generated',
			title: 'WD Components'
		}));
});