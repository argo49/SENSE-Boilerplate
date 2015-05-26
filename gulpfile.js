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
var nodemon    = require('gulp-nodemon');
var pngquant   = require('imagemin-pngquant');
var plumber    = require('gulp-plumber');
var del        = require('del');

gulp.task('default', ['build']);

// Initial build
gulp.task('build', ['clean'], function () {
    gulp.run(['sass', 'scripts', 'watch', 'html', 'ejs', 'images', 'server']);
});

// Compile scss
gulp.task('sass', function() {
    return gulp.src('views/src/scss/**/*.scss')
        .pipe(sourcemaps.init())
            .pipe(plumber())
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
    return gulp.src('views/src/images/**')
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
    return gulp.src('views/src/html/**/*.ejs')
        .pipe(gulp.dest('views/dist'));
});

// Minify HTML
gulp.task('html', function () {
    var options = {conditionals: true};
    return gulp.src('views/src/html/**/*.html')
        .pipe(minHtml(options))
        .pipe(gulp.dest('views/dist'));
});

// Start the node server
gulp.task('server', function () {
  nodemon({
    script: 'app.js',
    ext: 'js',
    ignore: ['node_modules', 'views', 'gulpfile.js'],
    env: { 'NODE_ENV': 'development' }
  }).on('restart', function () {
    console.log("Node server restarted.");
  });
});

// Clean the dist directory before gulping
gulp.task('clean', function (cb) {
  del(['views/dist/**/*'], cb);
});

// Watch things
gulp.task('watch', function() {
    gulp.watch('views/src/scss/**/*.scss', ['sass']);
    gulp.watch('views/src/js/**/*.js', ['scripts']);
    gulp.watch('views/src/html/**/*.html', ['html']);
    gulp.watch('views/src/html/**/*.ejs', ['ejs']);
    gulp.watch('views/src/images/**', ['images']);
});