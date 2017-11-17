import * as express from 'express';
import * as path from 'path';
import * as swaggerUi from 'swagger-ui-express';
import { Environment } from './helpers/Environment';
import { BasicAuthenticate } from './BasicAuthenticate';


export class SwaggerUI {

    public static getRoute(): string {
        return process.env.SWAGGER_ROUTE;
    }

    public setup(app: express.Application): void {
        if (Environment.isTruthy(process.env.SWAGGER_ENABLED)) {
            const baseFolder = __dirname.indexOf(`${path.sep}src${path.sep}`) >= 0 ? `${path.sep}src${path.sep}` : `${path.sep}dist${path.sep}`;
            const basePath = __dirname.substring(0, __dirname.indexOf(baseFolder));
            const swaggerFile = require(path.join(basePath, process.env.SWAGGER_FILE));
            const packageJson = require(path.join(basePath, 'package.json'));

            // Add npm infos to the swagger doc
            swaggerFile.info = {
                title: packageJson.name,
                description: packageJson.description,
                version: packageJson.version
            };

            // Initialize swagger-jsdoc -> returns validated swagger spec in json format
            app.use(SwaggerUI.getRoute(), BasicAuthenticate(), swaggerUi.serve, swaggerUi.setup(swaggerFile));
        }
    }
}
