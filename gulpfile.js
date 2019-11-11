//utils
const 
    gulp = require( 'gulp' ),
    browserSync = require( 'browser-sync' ).create(),
    gutil = require( 'gulp-util' ),
    rename = require( 'gulp-rename' );

// sass
const
    sass = require( 'gulp-sass' );

// postcss
const 
    postcss = require( 'gulp-postcss' ),
    cssnano = require( 'cssnano' ),
    autoprefixer = require( 'autoprefixer' ),
    csso = require( 'postcss-csso' );


// babel + browserify
const
    babel = require( 'gulp-babel' ),
    browserify = require( 'browserify' ),
    babelify = require( 'babelify' ),
    source = require( 'vinyl-source-stream' );

// pug
const
    pug = require( 'gulp-pug' );

/**
 * Default task.
 * 
 * Watches source folders for changes that triggers the appropriate task.
 * Watches dist folders for changes that triggers browser reload.
 */
gulp.task('default', () => {
    browserSync.init({
        server: {
            baseDir: "./dist/"
        }
    } );
    gulp.watch( './dist/**/*' ).on('change', browserSync.reload );
    gulp.watch('./src/scss/**/*.scss', gulp.task( 'sass' ) );
    gulp.watch('./src/js/*.js', gulp.task( 'babel' ) );
    gulp.watch('./src/pug/**/*.pug', gulp.task( 'pug' ) );
} );

// Rebuilds css from sass (with some postcss).
gulp.task('sass', () => {
    const plugins = [
        autoprefixer( { browserlist: [ 'last 2 versions' ] } ),
        cssnano(),
        csso()
    ];
    return gulp.src( './src/scss/**/*.scss' )
        .pipe( sass().on('error', sass.logError ) )
        .pipe( postcss(plugins ) )
        .pipe(rename({suffix: '.min'} ) )
        .pipe( gulp.dest('./dist/css' ) )
        .pipe( browserSync.stream() );
} );

// Transforms javascript with babel and @babel/preset-env
gulp.task('babel', () => {
    return browserify({
        entries: './src/js/main.js',
        debug: true
    } )
    .transform(babelify, { presets: ['@babel/preset-env'] } )
    .on( 'error',gutil.log )
    .bundle()
    .on( 'error',gutil.log )
    .pipe( source('bundle.js' ) )
    .pipe( gulp.dest('dist/js' ) )
    .pipe( browserSync.stream() );
} );

// Transforms pugs to html
gulp.task('pug', () => {
    return gulp.src( './src/pug/**/*.pug' )
    .pipe(pug({
        doctype: 'html',
        pretty: true,
    } ) )
    .pipe( gulp.dest('./dist/' ) );
} );