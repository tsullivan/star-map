var gulp = require('gulp'),
	log = require('gulp-util').log,
	jshint = require('gulp-jshint'),
	less = require('gulp-less'),
	path = require('path'),
	nodemon = require('nodemon'),
	lr;

// helper functions
function startnodemon () {
	// start the express app
	nodemon({
		script: 'index.js',
		ext: 'js json'
	});

	// log nodemon events
	nodemon.on('start', function () {
		console.log('App has started');
	})
	.on('quit', function () {
		console.log('App has quit');
	})
	.on('restart', function (files) {
		console.log('App restarted due to: ', files);
	});
}

function startlr () {
	log('Starting Livereload');
	lr = require('tiny-lr')();
	lr.listen(35729);
}

function notifylr (event) {
	var filename = path.relative(__dirname, event.path);
	lr.changed({
		body: {
			files: [filename]
		}
	});
}

// gulp tasks
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

// default task
gulp.task('default', ['lint', 'less', 'watch'], function () {
	// start dev servers
	startlr();
	startnodemon();
});
