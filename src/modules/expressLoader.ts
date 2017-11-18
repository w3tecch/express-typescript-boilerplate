import * as path from 'path';
import { Container } from 'typedi';
import { useContainer as ormUseContainer } from 'typeorm';
import { useContainer as routingUseContainer, createExpressServer } from 'routing-controllers';
import { MicroframeworkSettings, MicroframeworkLoader } from 'microframework';
import { env } from '../core/env';


export const expressLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {

    /**
     * Setup routing-controllers to use typedi container.
     */
    routingUseContainer(Container);
    ormUseContainer(Container);

    /**
     * We create a new express server instance.
     * We could have also use useExpressServer here to attach controllers to an existing express instance.
     */
    const expressApp = createExpressServer({
        cors: true,
        routePrefix: env.app.routePrefix,
        /**
         * We can add options about how routing-controllers should configure itself.
         * Here we specify what controllers should be registered in our express server.
         */
        controllers: [path.join(__dirname, '..', 'api/controllers/*{.js,.ts}')],
        middlewares: [path.join(__dirname, '..', 'api/middlewares/*{.js,.ts}')],
        interceptors: [path.join(__dirname, '..', 'api/controllers/*{.js,.ts}')]

    });

    // Run application to listen on given port
    expressApp.listen(env.app.port);

    // Here we can set the data for other loaders
    if (settings) {
        settings.setData('express_app', expressApp);
    }
};
