'use strict';

const gulp = require('gulp');
const path = require('path');
const paths = require('../paths');
const util = require('../util');
const $ = require('gulp-load-plugins')({
    lazy: true
});

function lint(files) {
    return gulp
        .src(files)
        .pipe($.tslint({
            emitError: false,
            formatter: 'verbose'
        }))
        .pipe($.tslint.report())
        .on('error', function () {
            util.notify('TSLINT failed!');
        });
}

gulp.task('lint', () => lint([
    './typings/index.d.ts',
    './typings_custom/**/*.d.ts',
    path.join(paths.src, '/**/*.ts'),
    path.join(paths.test, '/**/*.ts')
]));
