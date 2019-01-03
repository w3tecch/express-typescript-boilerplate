import { getFromContainer, MetadataStorage } from 'class-validator';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import basicAuth from 'express-basic-auth';
import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';
import { getMetadataArgsStorage, MetadataArgsStorage } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import * as swaggerUi from 'swagger-ui-express';

import { env } from '../env';

export const swaggerLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
    if (settings && env.swagger.enabled) {
        const expressApp = settings.getData('express_app');
        const validationMetadatas = (getFromContainer(MetadataStorage) as any).validationMetadatas;
        const schemas = validationMetadatasToSchemas(validationMetadatas, {
            refPointerPrefix: '#/components/schemas',
        });

        const routingMetadataStorage: MetadataArgsStorage = getMetadataArgsStorage();
        const swaggerFile: any = routingControllersToSpec(routingMetadataStorage, {}, {
            servers: [
                {
                    url: `${env.app.schema}://${env.app.host}:${env.app.port}${env.app.routePrefix}`,
                },
            ],
            info: {
                title: env.app.name,
                description: env.app.description,
                version: env.app.version,
            },
            components: {
                schemas,
            },
        });

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
