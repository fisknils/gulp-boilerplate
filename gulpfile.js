//utils
const 
    gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    gutil = require('gulp-util'),
    rename = require('gulp-rename');

//css
const
    sass = require('gulp-sass'),
    postcss = require('gulp-postcss');

//postcss
const 
    cssnano = require('cssnano'),
    autoprefixer = require('autoprefixer'),
    csso = require('postcss-csso');


//babel + browserify
const
    babel = require('gulp-babel'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    source = require('vinyl-source-stream');

//pug
const
    pug = require('gulp-pug');

gulp.task('default', () => {
    browserSync.init({
        server: {
            baseDir: "./dist/"
        }
    });
    gulp.watch('./dist/html/*.html').on('change', browserSync.reload);
    gulp.watch('./src/scss/**/*.scss', gulp.task('sass') );
    gulp.watch('./src/js/*.js', gulp.task('babel'));
    gulp.watch('./src/pug/*.pug', gulp.task('pug'));
    gulp.watch('./src/pug/**/*.pug', gulp.task('pug'));
});

gulp.task('sass', () => {
    const plugins = [
        autoprefixer( { browserlist: [ 'last 2 versions' ] } ),
        cssnano(),
        csso()
    ];
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(plugins))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream());
});

gulp.task('babel', function() {
    return browserify({
        entries: './src/js/main.js',
        debug: true
    })
    .transform(babelify, { presets: ['@babel/preset-env'] })
    .on('error',gutil.log)
    .bundle()
    .on('error',gutil.log)
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
});

gulp.task('pug', function() {
    return gulp.src('./src/pug/**/*.pug')
    .pipe(pug({
        doctype: 'html',
        pretty: true,
    }))
    .pipe(gulp.dest('./dist/'));
});