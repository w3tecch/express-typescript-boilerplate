import * as path from 'path';
import * as monitor from 'express-status-monitor';
import * as basicAuth from 'express-basic-auth';
import { MicroframeworkSettings, MicroframeworkLoader } from 'microframework';
import { env } from '../core/env';


export const monitorLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
    if (settings && env.monitor.enabled) {
        const expressApp = settings.getData('express_app');
        const swaggerFile = require(path.join(__dirname, '..', env.swagger.file));

        // Add npm infos to the swagger doc
        swaggerFile.info = {
            title: env.app.name,
            description: env.app.description,
            version: env.app.version
        };

        expressApp.use(monitor());
        expressApp.get(
            env.monitor.route,
            basicAuth({
                users: {
                    [`${env.monitor.username}`]: env.monitor.password
                },
                challenge: true
            }),
            monitor().pageRoute
        );

    }
};
