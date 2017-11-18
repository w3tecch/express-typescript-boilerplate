/**
 * EXPRESS TYPESCRIPT BOILERPLATE
 * ----------------------------------------
 *
 * This is a boilerplate for Node.js Application written in TypeScript.
 * The basic layer of this app is express. For further information visit
 * the 'README.md' file.
 *
 * To add express modules go to the 'config/AppConfig.ts' file. All the IOC registrations
 * are in the 'config/IocConfig.ts' file.
 */
import 'reflect-metadata';
import * as dotenv from 'dotenv';
dotenv.config();

import { Log } from './core/Log';
const log = new Log(__filename);

import { bootstrapMicroframework } from 'microframework';
import { expressLoader } from './modules/expressLoader';
import { winstonLoader } from './modules/winstonLoader';
import { typeormLoader } from './modules/typeormLoader';


bootstrapMicroframework({
    loaders: [
        winstonLoader,
        expressLoader,
        typeormLoader
        // here we can setup other databases, any other lib we want to setup in our application
    ]
})
    .then(() => log.info('Application is up and running.'))
    .catch(error => log.error('Application is crashed: ' + error));
