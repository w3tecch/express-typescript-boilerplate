// import * as path from 'path';
// import * as jsonfile from 'jsonfile';
// import { getMetadataArgsStorage } from 'routing-controllers';
// import { routingControllersToSpec } from 'routing-controllers-openapi';
// import { getFromContainer, MetadataStorage } from 'class-validator';
// import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { MicroframeworkSettings, MicroframeworkLoader } from 'microframework-w3tec';
// import { env } from '../core/env';


export const swaggerFileLoader: MicroframeworkLoader = async (settings: MicroframeworkSettings | undefined) => {
    // if (settings && env.swagger.enabled) {
    //     const metadataContainer = getFromContainer(MetadataStorage) as any;
    //     const metadatas = metadataContainer.validationMetadatas;
    //     const schemas = validationMetadatasToSchemas(metadatas, {
    //         refPointerPrefix: '#/components/schemas',
    //     });

    //     const storage = getMetadataArgsStorage();
    //     const spec = routingControllersToSpec(storage, {
    //         routePrefix: env.app.routePrefix,
    //     }, { components: { schemas } });

    //     const swaggerFilePath = path.join(__dirname, '..', env.swagger.file);
    //     await jsonfile.writeFile(swaggerFilePath, spec, { spaces: 2 });
    // }
};
