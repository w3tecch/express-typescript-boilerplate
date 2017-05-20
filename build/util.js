'use strict';

const gulp = require('gulp');
const notifier = require('node-notifier');

var util = {
    notify: function notify(title, message) {
        notifier.notify({
            'title': title || 'Gulp',
            'message': message || 'Please check your log or open your browser.',
            icon: process.cwd() + '/icon.png'
        });
    }
};

module.exports = util;
