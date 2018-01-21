import * as path from 'path';
import * as swaggerUi from 'swagger-ui-express';
import * as basicAuth from 'express-basic-auth';
import * as jsonfile from 'jsonfile';
import { getMetadataArgsStorage } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import { getFromContainer, MetadataStorage } from 'class-validator';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { MicroframeworkSettings, MicroframeworkLoader } from 'microframework-w3tec';
import { env } from '../core/env';


export const swaggerLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
    if (settings && env.swagger.enabled) {

        // Generate swagger file from controllers

        const metadataContainer = getFromContainer(MetadataStorage) as any;
        const metadatas = metadataContainer.validationMetadatas;
        const schemas = validationMetadatasToSchemas(metadatas, {
            refPointerPrefix: '#/components/schemas',
        });

        const storage = getMetadataArgsStorage();
        const spec = routingControllersToSpec(storage, {
            routePrefix: env.app.routePrefix,
        }, { components: { schemas } });

        const swaggerFilePath = path.join(__dirname, '..', env.swagger.file);
        jsonfile.writeFileSync(swaggerFilePath, spec, { spaces: 2 });

        // Add npm infos to the swagger doc

        const expressApp = settings.getData('express_app');
        const swaggerFile = require(path.join(__dirname, '..', env.swagger.file));

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
