var gulp       = require('gulp');
var sass       = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var prefix     = require('gulp-autoprefixer');
var please     = require('gulp-pleeease');
var rename     = require('gulp-rename');
var concat     = require('gulp-concat');
var uglify     = require('gulp-uglify');
var minHtml    = require('gulp-minify-html');
var imagemin   = require('gulp-imagemin');
var pngquant   = require('imagemin-pngquant');
var exec       = require('child_process').exec;

gulp.task('default',
    ['server', 'sass', 'scripts', 'watch', 'html', 'ejs', 'images']);

// Compile scss
gulp.task('sass', function() {
    return gulp.src('views/src/scss/**/*.scss')
        .pipe(sourcemaps.init())
            .pipe(sass())
            .pipe(prefix())
            .pipe(please())
        .pipe(sourcemaps.write('views/dist/css'))
        .pipe(gulp.dest('views/dist/css'));
});

// Concat and minify js
gulp.task('scripts', function() {
    return gulp.src('views/src/js/**/*.js')
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(gulp.dest('views/dist/js'));
});


// Image compression
gulp.task('images', function () {
    return gulp.src('src/images/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('views/dist/images'));
});

// Pump ejs templates to the distribution folder
// TODO: Figure out a way to minify generated templates
gulp.task('ejs', function () {
    return gulp.src('src/html/**/*.ejs')
        .pipe(gulp.dest('dist'));
});

// Minify HTML
gulp.task('html', function () {
    var options = {conditionals: true};
    return gulp.src('views/src/html/**/*.html')
        .pipe(minHtml(options))
        .pipe(gulp.dest('views/dist'));
});

// Start the node server
gulp.task('server', function (cb) {
  exec('npm start', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

// Watch things
gulp.task('watch', function() {
    gulp.watch('views/src/scss/**/*.scss', ['sass']);
    gulp.watch('views/src/js/**/*.js', ['scripts']);
    gulp.watch('views/src/**/*.html', ['html']);
    gulp.watch('views/src/**/*.ejs', ['ejs']);
    gulp.watch('views/src/images/*', ['images']);
});