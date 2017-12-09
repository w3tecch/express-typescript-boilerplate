import { MicroframeworkSettings, MicroframeworkLoader } from 'microframework';
import { createGraphQLServer } from '../lib/graphql';
import { env } from '../core/env';


export const graphqlLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
    if (settings && env.swagger.enabled) {
        const expressApp = settings.getData('express_app');

        createGraphQLServer(expressApp, {
            route: env.graphql.route,
            editorEnabled: env.graphql.enabled,
            queries: env.app.dirs.queries,
            mutations: env.app.dirs.queries,
        });

    }
};
