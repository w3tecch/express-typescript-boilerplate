

import * as http from 'http';
import { bootstrapMicroframework, Microframework } from 'microframework';
import { Application } from 'express';
import { Connection } from 'typeorm/connection/Connection';
import { expressLoader } from './../../../src/loaders/expressLoader';
import { winstonLoader } from './../../../src/loaders/winstonLoader';
import { swaggerLoader } from './../../../src/loaders/swaggerLoader';
import { monitorLoader } from './../../../src/loaders/monitorLoader';
import { homeLoader } from './../../../src/loaders/homeLoader';
import { typeormLoader } from '../utils/typeormLoader';
import { publicLoader } from './../../../src/loaders/publicLoader';
import { iocLoader } from './../../../src/loaders/iocLoader';
import { graphqlLoader } from './../../../src/loaders/graphqlLoader';
import { eventDispatchLoader } from './../../../src/loaders/eventDispatchLoader';

export interface BootstrapSettings {
    app: Application;
    server: http.Server;
    connection: Connection;
}

export const bootstrapApp = async (): Promise<BootstrapSettings> => {
    const framework = await bootstrapMicroframework({
        loaders: [
            winstonLoader,
            iocLoader,
            eventDispatchLoader,
            typeormLoader,
            expressLoader,
            homeLoader,
        ],
    });
    return {
        app: framework.settings.getData('express_app') as Application,
        server: framework.settings.getData('express_server') as http.Server,
        connection: framework.settings.getData('connection') as Connection,
    } as BootstrapSettings;
};
