'use strict';

const gulp = require('gulp');
const path = require('path');
const paths = require('../paths');
const runSequence = require('run-sequence');
const pkg = require('../../package.json');
const $ = require('gulp-load-plugins')({
    lazy: true
});

gulp.task('zip', (callback) => runSequence(
    'build',
    'zip:create',
    'clean',
    callback
));

gulp.task('zip:create', () => {
    const packageFileFilter = $.filter(['package.json'], { restore: true });
    return gulp
        .src([
            path.join(paths.src, '**/*.js'),
            'manifest.yml',
            'package.json'
        ])
        .pipe(packageFileFilter)
        .pipe($.jsonEditor((json) => {
            json.scripts.start = 'node index.js';
            return json;
        }))
        .pipe(packageFileFilter.restore)
        .pipe($.zip(pkg.name + '-' + pkg.version + '.zip'))
        .pipe(gulp.dest(paths.dist))
});
