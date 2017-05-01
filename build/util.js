'use strict';

const gulp = require('gulp'),
    path = require('path'),
    paths = require('./paths'),
    $ = require('gulp-load-plugins')({
        lazy: true
    });

var util = {
    notify: notify,
    getPkg: getPkg,
    getJs: getJs,
    buildConfig: buildConfig
};

module.exports = util;

function getPkg() {
    return require(path.join(process.cwd(), 'package.json'));
}

function notify(title, message) {
    var notifier = require('node-notifier');
    notifier.notify({
        'title': title || 'Gulp',
        'message': message || 'Please check your log or open your browser.',
        icon: process.cwd() + '/icon.png'
    });
}

function getJs(filename) {
    return filename.replace('.ts', '.js');
}

function buildConfig(target) {
    var env = $.util.env.environment || $.util.env.env || 'dev';
    var configBase = './config';
    var options = getPkg();
    options.env = env;
    return gulp
        .src(path.join(configBase, env + '.json'))
        .pipe($.rename('config.json'))
        .pipe($.template(options))
        .pipe(gulp.dest(target));
}
