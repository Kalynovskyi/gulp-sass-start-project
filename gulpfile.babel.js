import gulp from "gulp";
import autoprefixer from "gulp-autoprefixer";
import gulpSass from "gulp-sass";
import dartSass from "dart-sass";
import livereload from "gulp-livereload";
import minify from "gulp-minify";
import gcmq from "gulp-group-css-media-queries";
    
const sass = gulpSass(dartSass);

gulp.task('sass', function () {
	return gulp.src(['assets/sass/**/*.scss'])
		.pipe(sass())
		.on('error', sass.logError)
		.pipe(autoprefixer())
		.pipe(gcmq())
		.pipe(gulp.dest('./'))
		.pipe(livereload());
});

gulp.task('js', function () {
	return gulp.src('assets/js/src/*.js')
		.pipe(minify({
			ext: {
				min: '.min.js'
			},
			noSource: true
		})) // Mifify js (opt.)
		.pipe(gulp.dest('assets/js'))
		.pipe(livereload());
});

gulp.task('watch', function () {
	livereload.listen();

	gulp.watch('assets/sass/**/*.scss', gulp.series('sass'));
	gulp.watch('assets/js/libs/**/*.js', gulp.series('js'));
	gulp.watch('assets/js/src/*.js', gulp.series('js'));
});


gulp.task('default', gulp.series('sass', 'js', 'watch'));