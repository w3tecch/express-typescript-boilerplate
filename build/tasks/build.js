'use strict';

const gulp = require('gulp');
const path = require('path');
const runSequence = require('run-sequence');
const paths = require('../paths');
const util = require('../util');
const $ = require('gulp-load-plugins')({
    lazy: true
});

let tsProjectSource, tsProjectTest;

gulp.task('build', (callback) => runSequence(
    'lint',
    'clean',
    [
        'build:transpile:src',
        'build:transpile:test'
    ],
    callback
));

gulp.task('build:transpile:src', () => transpiler(paths.src));
gulp.task('build:transpile:test', () => transpiler(paths.test, true));

function transpiler(filePath, isTest, files) {

    if (files === undefined) {
        files = '/**/*.ts';
    }

    if (!tsProjectSource && !isTest) {
        tsProjectSource = $.typescript.createProject('tsconfig.json', {
            'typescript': require('typescript')
        });
    }

    if (!tsProjectTest && isTest) {
        tsProjectTest = $.typescript.createProject('tsconfig.json', {
            'typescript': require('typescript')
        });
    }

    let tsProject = !!isTest ? tsProjectTest : tsProjectSource;
    return gulp
        .src([
            './typings/index.d.ts',
            './typings_custom/**/*.d.ts',
            path.join(filePath, files)
        ])
        .pipe($.plumber({ errorHandler: $.notify.onError('Error: <%= error.message %>') }))
        .pipe($.sourcemaps.init({ loadMaps: true }))
        .pipe(tsProject())
        .pipe($.sourcemaps.write()) // inline sourcemaps
        .pipe(gulp.dest(filePath));
}
