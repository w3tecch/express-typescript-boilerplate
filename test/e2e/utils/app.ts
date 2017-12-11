

import { bootstrapMicroframework, Microframework } from 'microframework';
import { Application } from 'express';
import { expressLoader } from './../../../src/loaders/expressLoader';
import { winstonLoader } from './../../../src/loaders/winstonLoader';
import { typeormLoader } from './../../../src/loaders/typeormLoader';
import { swaggerLoader } from './../../../src/loaders/swaggerLoader';
import { monitorLoader } from './../../../src/loaders/monitorLoader';
import { homeLoader } from './../../../src/loaders/homeLoader';
import { publicLoader } from './../../../src/loaders/publicLoader';
import { iocLoader } from './../../../src/loaders/iocLoader';
import { graphqlLoader } from './../../../src/loaders/graphqlLoader';
import { eventDispatchLoader } from './../../../src/loaders/eventDispatchLoader';

export const bootstrapApp = async (): Promise<Application> => {
    const framework = await bootstrapMicroframework({
        loaders: [
            winstonLoader,
            iocLoader,
            eventDispatchLoader,
            typeormLoader,
            expressLoader,
            homeLoader,
            // publicLoader,
            // graphqlLoader,
        ],
    });
    return framework.settings.getData('express_app') as Application;
};
