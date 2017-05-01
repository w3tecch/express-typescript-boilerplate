import * as _ from 'lodash';

const config = require('./src/config');

let databaseConfig = {};

_.forOwn(_.clone(config), (value, key) => databaseConfig[`${key}`] = value.database);

module.exports = databaseConfig;
