import * as path from 'path';
import { createExpressServer } from 'routing-controllers';
import { MicroframeworkSettings, MicroframeworkLoader } from 'microframework';
import { env } from '../core/env';
import { authorizationChecker } from '../auth/authorizationChecker';
import { currentUserChecker } from '../auth/currentUserChecker';


export const expressLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
    if (settings) {
        const connection = settings.getData('connection');

        /**
         * We create a new express server instance.
         * We could have also use useExpressServer here to attach controllers to an existing express instance.
         */
        const expressApp = createExpressServer({
            cors: true,
            routePrefix: env.app.routePrefix,
            /**
             * TODO: We can add options about how routing-controllers should configure itself.
             * Here we specify what controllers should be registered in our express server.
             */
            controllers: [path.join(__dirname, '..', 'api/controllers/*{.js,.ts}')],
            middlewares: [path.join(__dirname, '..', 'api/middlewares/*{.js,.ts}')],
            interceptors: [path.join(__dirname, '..', 'api/interceptors/*{.js,.ts}')],

            /**
             * Authorization features
             */
            authorizationChecker: authorizationChecker(connection),
            currentUserChecker: currentUserChecker(connection)
        });

        // Run application to listen on given port
        expressApp.listen(env.app.port);

        // Here we can set the data for other loaders
        settings.setData('express_app', expressApp);
    }
};
