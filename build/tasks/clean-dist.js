'use strict';

const gulp = require('gulp');
const path = require('path');
const paths = require('../paths');
const $ = require('gulp-load-plugins')({
    lazy: true
});


gulp.task('clean:dist', () => {
    return gulp
        .src(paths.dist, {
            read: false
        })
        .pipe($.clean());
});
