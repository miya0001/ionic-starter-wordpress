
'use strict';

var gulp = require( 'gulp' );
var sass = require('gulp-sass');

gulp.task('sass', function () {
  return gulp.src( './css/sass/style.scss' )
    .pipe( sass().on( 'error', sass.logError ) )
    .pipe( gulp.dest( './css/' ) );
});

gulp.task( 'default', [ 'sass' ], function () {
  return gulp.src( [
      './node_modules/jquery/dist/jquery.min.js',
      './node_modules/wp-angularjs/build/wp-angular.min.js'
    ] )
    .pipe( gulp.dest( 'lib' ) );
} );
