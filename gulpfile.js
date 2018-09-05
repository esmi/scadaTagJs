// var gulp = require('gulp');
//
// gulp.task('default', function() {
//   // place code for your default task here
// });

const gulp = require('gulp');
const babel = require('gulp-babel');
const minify = require('gulp-minify');
const uglify = require('gulp-uglify');
const pump = require('pump');

gulp.task('default', () =>
	gulp.src('src/*.js')
		.pipe(babel({
			//presets: ['@babel/env']
		}))
		.pipe(gulp.dest('lib'))
);

gulp.task('compress', function() {
  gulp.src(['lib/*.js', 'lib/*.mjs'])
    .pipe(minify())
    .pipe(gulp.dest('dist'))
});

gulp.task('uglify', function (cb) {
  pump([
        gulp.src('lib/*.js'),
        uglify(),
        gulp.dest('dist')
    ],
    cb
  );
});
