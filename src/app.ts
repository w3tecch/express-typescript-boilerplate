/**
 * EXPRESS TYPESCRIPT BOILERPLATE
 * ----------------------------------------
 *
 * This is a boilerplate for Node.js Application written in TypeScript.
 * The basic layer of this app is express. For further information visit
 * the 'README.md' file.
 */
import 'reflect-metadata';
import { banner } from './core/banner';
import { Logger } from './core/Logger';
const log = new Logger(__filename);

import { bootstrapMicroframework } from 'microframework-w3tec';
import { expressLoader } from './loaders/expressLoader';
import { winstonLoader } from './loaders/winstonLoader';
import { typeormLoader } from './loaders/typeormLoader';
import { swaggerLoader } from './loaders/swaggerLoader';
import { monitorLoader } from './loaders/monitorLoader';
import { homeLoader } from './loaders/homeLoader';
import { publicLoader } from './loaders/publicLoader';
import { iocLoader } from './loaders/iocLoader';
import { graphqlLoader } from './loaders/graphqlLoader';
import { eventDispatchLoader } from './loaders/eventDispatchLoader';


bootstrapMicroframework({
    /**
     * Loader is a place where you can configure all your modules during microframework
     * bootstrap process. All loaders are executed one by one in a sequential order.
     */
    loaders: [
        winstonLoader,
        iocLoader,
        eventDispatchLoader,
        typeormLoader,
        expressLoader,
        swaggerLoader,
        monitorLoader,
        homeLoader,
        publicLoader,
        graphqlLoader,
    ],
})
    .then(() => banner(log))
    .catch(error => log.error('Application is crashed: ' + error));
