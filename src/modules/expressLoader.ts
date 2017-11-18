import { Container } from 'typedi';
import { MicroframeworkSettings, MicroframeworkLoader } from 'microframework';
import { createExpressServer, useContainer } from 'routing-controllers';

import { UserController } from '../api/controllers/UserController';


export const expressLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {

    /**
     * Setup routing-controllers to use typedi container.
     */
    useContainer(Container);

    /**
     * We create a new express server instance.
     * We could have also use useExpressServer here to attach controllers to an existing express instance.
     */
    const app = createExpressServer({
        /**
         * We can add options about how routing-controllers should configure itself.
         * Here we specify what controllers should be registered in our express server.
         */
        controllers: [
            UserController
        ]
    });

    // // create express app
    // const app = express();

    // // register all routes
    // const routes: any = Routes;
    // Object.keys(routes).forEach(routePath => app.get(routePath, routes[routePath]));

    // run application to listen on given port
    app.listen(3000);

    // here we can set the data for other loaders
    if (settings) {
        settings.setData('express_app', app);
    }
};
