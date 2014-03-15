var gulp = require('gulp'),
	concat = require('gulp-concat'),
	log = require('gulp-util').log,
	jshint = require('gulp-jshint'),
	less = require('gulp-less'),
	path = require('path'),
	nodemon = require('nodemon'),
	browserify = require('browserify'),
	fs = require('fs'),
	lr;

// helper functions
function startnodemon () {
	// start the express app
	nodemon({
		script: 'index.js',
		ignore: ['gulpfile.js', 'client/*.js', 'public/*.js'],
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
	gulp.src(['gulpfile.js', 'client/*.js'])
		.pipe(jshint({
			lookup: false
		}))
		.pipe(jshint.reporter('default'));
	});

gulp.task('scripts', function () {
	var b = browserify('./client/main.js')
			.bundle()
			.pipe(fs.createWriteStream(__dirname + '/public/js/app.js'));

	gulp.src([
			'vendor/lodash/dist/lodash.underscore.min.js',
			'vendor/jquery/dist/jquery.min.js',
			'vendor/backbone/backbone.js'
		])
		.pipe(concat('vendor.js'))
		.pipe(gulp.dest('public/js'));

});

gulp.task('less', function () {
	gulp.src('less/*.less')
		.pipe(less({
			paths: [ path.join(__dirname, 'less') ]
		}))
		.pipe(gulp.dest('public/css'));
	});

gulp.task('watch', function () {
	log('Watching Files');

	gulp.watch('client/*.js', ['lint', 'scripts']);
	gulp.watch('less/*.less', ['less']);

	gulp.watch([
			'public/css/style.css',
			'public/js/app.js',
			'views/**/*.jade'
		], notifylr);
});

// default task
gulp.task('default', ['lint', 'less', 'scripts', 'watch'], function () {
	// start dev servers
	startlr();
	startnodemon();
});
