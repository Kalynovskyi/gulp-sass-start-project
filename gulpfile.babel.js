import gulp from "gulp";
import autoprefixer from "gulp-autoprefixer";
import gulpSass from "gulp-sass";
import dartSass from "dart-sass";
import livereload from "gulp-livereload";
import minify from "gulp-minify";
import gcmq from "gulp-group-css-media-queries";
import cleanCSS from "gulp-clean-css";
import concatCss from "gulp-concat-css";
    
const sass = gulpSass(dartSass);

gulp.task('scss', function () {
	return gulp.src(['assets/scss/**/*.scss'])
		.pipe(sass())
		.on('error', sass.logError)
		.pipe(gcmq())
		.pipe(concatCss("./styles.css"))
		.pipe(gulp.dest('./'))
		.pipe(autoprefixer())
		.pipe(livereload());
});

gulp.task('js', function () {
	return gulp.src('assets/js/src/*.js')
		// .pipe(minify({
		// 	ext: {
		// 		min: '.min.js'
		// 	},
		// 	noSource: true
		// })) // Mifify js (opt.)
		//.pipe(gulp.dest('assets/js'))
		.pipe(livereload());
});

gulp.task('css-minify', function(){
    return gulp.src('./styles.css')
        .pipe(cleanCSS({
            compatibility: "ie8"
        }))
        .pipe(gulp.dest('./'))
});

gulp.task('watch', function () {
	livereload.listen();

	gulp.watch('assets/scss/**/*.scss', gulp.series('scss'));
	gulp.watch('assets/js/libs/**/*.js', gulp.series('js'));
	gulp.watch('assets/js/src/*.js', gulp.series('js'));
});


gulp.task('default', gulp.series('scss', 'js', 'watch'));