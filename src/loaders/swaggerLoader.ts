import * as path from 'path';
import * as swaggerUi from 'swagger-ui-express';
import * as basicAuth from 'express-basic-auth';
import { MicroframeworkSettings, MicroframeworkLoader } from 'microframework-w3tec';
import { env } from '../core/env';


export const swaggerLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
    if (settings && env.swagger.enabled) {
        const expressApp = settings.getData('express_app');
        const swaggerFile = require(path.join(__dirname, '..', env.swagger.file));

        // Add npm infos to the swagger doc
        swaggerFile.info = {
            title: env.app.name,
            description: env.app.description,
            version: env.app.version,
        };
        swaggerFile.host = env.app.route;
        swaggerFile.basePath = env.app.routePrefix;

        expressApp.use(
            env.swagger.route,
            env.swagger.username ? basicAuth({
                users: {
                    [`${env.swagger.username}`]: env.swagger.password,
                },
                challenge: true,
            }) : (req, res, next) => next(),
            swaggerUi.serve,
            swaggerUi.setup(swaggerFile)
        );

    }
};
