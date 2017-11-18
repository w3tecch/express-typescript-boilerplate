import * as express from 'express';
import { MicroframeworkSettings, MicroframeworkLoader } from 'microframework';
import { Routes } from '../api/routes';


export const expressLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {

    // create express app
    const app = express();

    // register all routes
    const routes: any = Routes;
    Object.keys(routes).forEach(routePath => app.get(routePath, routes[routePath]));

    // run application to listen on given port
    app.listen(3000);

    // here we can set the data for other loaders
    if (settings) {
        settings.setData('express_app', app);
    }
};
