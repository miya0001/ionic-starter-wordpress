
'use strict';

var gulp = require( 'gulp' );
var sass = require('gulp-sass');

gulp.task('sass', function () {
  return gulp.src( './css/sass/common.scss' )
    .pipe( sass().on( 'error', sass.logError ) )
    .pipe( gulp.dest( './css/' ) );
});

gulp.task( 'default', [ 'sass' ], function () {

} );
