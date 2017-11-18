import { Container } from 'typedi';
import { useContainer as ormUseContainer } from 'typeorm';
import { useContainer as routingUseContainer, createExpressServer } from 'routing-controllers';
import { MicroframeworkSettings, MicroframeworkLoader } from 'microframework';


export const expressLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
    // base directory. we use it because file in "required" in another module
    const baseDir = __dirname;

    /**
     * Setup routing-controllers to use typedi container.
     */
    routingUseContainer(Container);
    ormUseContainer(Container);

    /**
     * We create a new express server instance.
     * We could have also use useExpressServer here to attach controllers to an existing express instance.
     */
    const app = createExpressServer({
        cors: true,
        /**
         * We can add options about how routing-controllers should configure itself.
         * Here we specify what controllers should be registered in our express server.
         */
        controllers: [baseDir + '**/api/controllers/*{.js,.ts}'],
        middlewares: [baseDir + '**/api/middlewares/*{.js,.ts}']

    });

    // run application to listen on given port
    app.listen(3000);

    // here we can set the data for other loaders
    if (settings) {
        settings.setData('express_app', app);
    }
};
