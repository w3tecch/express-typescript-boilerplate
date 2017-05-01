'use strict';

const gulp = require('gulp');
const path = require('path');
const paths = require('../paths');
const util = require('../util');
const $ = require('gulp-load-plugins')({
    lazy: true
});
const pkg = require('../../package.json');
const tsc = require('../../tsconfig.json');

gulp.task('docs', ['clean:docs'], function () {
    return gulp
        .src([
            './typings/index.d.ts',
            './typings_custom/**/*.d.ts',
            path.join(paths.src, '/**/*.ts')
        ])
        .pipe($.typedoc({
            module: tsc.compilerOptions.module,
            target: tsc.compilerOptions.target,
            moduleResolution: tsc.compilerOptions.moduleResolution,
            out: paths.docs,
            name: pkg.name
        }));
});
