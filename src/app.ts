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
import * as dotenv from 'dotenv';
dotenv.config();

import { bootstrapMicroframework } from 'microframework';
import { expressLoader } from './modules/expressLoader';
import { winstonLoader } from './modules/winstonLoader';
import { typeormLoader } from './modules/typeormLoader';
import { env } from './env';


bootstrapMicroframework({
    config: {
        logo: env.app.name,
        showBootstrapTime: true
    },
    loaders: [
        expressLoader,
        winstonLoader,
        typeormLoader
        // here we can setup other databases, any other lib we want to setup in our application
    ]
})
    .then(() => console.log('Application is up and running.'))
    .catch(error => console.log('Application is crashed: ' + error));
