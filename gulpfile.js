var gulp = require('gulp'),
	log = require('gulp-util').log,
	jshint = require('gulp-jshint'),
	less = require('gulp-less'),
	path = require('path'),
	lr;

function notifylr (event) {
	var filename = path.relative(__dirname, event.path);
	lr.changed({
		body: {
			files: [filename]
		}
	});
}

gulp.task('startlr', function () {
	log('Starting Livereload');
	lr = require('tiny-lr')();
	lr.listen(35729);
});

gulp.task('lint', function() {
	gulp.src(['gulpfile.js', './src/*.js'])
		.pipe(jshint({
			lookup: false
		}))
		.pipe(jshint.reporter('default'));
	});

gulp.task('less', function () {
	gulp.src('./less/**/*.less')
		.pipe(less({
			paths: [ path.join(__dirname, 'less') ]
		}))
		.pipe(gulp.dest('./public/css'));
	});

gulp.task('watch', function () {
	log('Watching Files');

	gulp.watch('./src/**/*.js', ['lint']);
	gulp.watch('./less/**/*.less', ['less']);

	gulp.watch(['./less/**/*.less', './views/index.jade'], notifylr);
});

gulp.task('default', ['lint', 'less', 'watch', 'startlr'], function () {
	// start express
	require('./');
});
