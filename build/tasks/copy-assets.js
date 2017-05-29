'use strict';

const gulp = require('gulp');
const path = require('path');
const paths = require('../paths');
const $ = require('gulp-load-plugins')({
    lazy: true
});


gulp.task('copy:assets', () => {
    return gulp
        .src([
            path.join(paths.src, '/public/**/*'),
            path.join(paths.src, '/**/*.json')
        ], { base: paths.src })
        .pipe(gulp.dest(paths.dist));
});
