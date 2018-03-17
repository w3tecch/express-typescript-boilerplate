import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';

import { Pet } from '../api/models/Pet';
import { PetRepository } from '../api/repositories/PetRepository';
import { UserRepository } from '../api/repositories/UserRepository';
import { env } from '../env';
import { createDataLoader, createGraphQLServer } from '../lib/graphql';

export const graphqlLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
    if (settings && env.graphql.enabled) {
        const expressApp = settings.getData('express_app');

        createGraphQLServer(expressApp, {
            route: env.graphql.route,
            editorEnabled: env.graphql.editor,
            queries: env.app.dirs.queries,
            mutations: env.app.dirs.mutations,
            dataLoaders: {
                user: createDataLoader(UserRepository),
                pet: createDataLoader(Pet),
                petsByUserIds: createDataLoader(PetRepository, {
                    method: 'findByUserIds',
                    key: 'userId',
                    multiple: true,
                }),
            },
        });

    }
};
