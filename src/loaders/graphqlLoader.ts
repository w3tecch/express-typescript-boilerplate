import * as express from 'express';
import GraphQLHTTP from 'express-graphql';
import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';
import * as path from 'path';
import { AuthChecker, buildSchema } from 'type-graphql';
import Container from 'typedi';

import { env } from '../env';
import { getErrorCode, getErrorMessage, handlingErrors } from '../lib/graphql';

const authChecker: AuthChecker<Context> = ({ context: { user } }, roles) => {
    if (roles.length === 0) {
        return user !== undefined;
    }
    if (!user) {
        return false;
    }
    if (roles.includes(user.role)) {
        return true;
    }
    return false;
};

export const graphqlLoader: MicroframeworkLoader = async (settings: MicroframeworkSettings | undefined) => {
    if (settings && env.graphql.enabled) {
        const expressApp = settings.getData('express_app');

        const schema = await buildSchema({
            resolvers: env.app.dirs.resolvers,
            // automatically create `schema.gql` file with schema definition in current folder
            emitSchemaFile: path.resolve(__dirname, '../api', 'schema.gql'),
            authChecker,
        });

        handlingErrors(schema);

        // Add graphql layer to the express app
        expressApp.use(env.graphql.route, (request: express.Request, response: express.Response) => {

            // Build GraphQLContext
            const requestId = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER); // uuid-like
            const container = Container.of(requestId); // get scoped container
            const context = { requestId, container, request, response,
                user: {userId: undefined, role: 'guest'} }; // create our context
            container.set('context', context); // place context or other data in container

            try {
                // example header value: {userId: "user-id", role: "admin"}
                // todo: parse bearer token here
                if (request.headers.authorization) {
                    context.user = JSON.parse(request.headers.authorization);
                }
            } catch (err) {
                console.log('Cannot parse auhtorization header. It should be JSON.');
            }

            // Setup GraphQL Server
            GraphQLHTTP({
                schema,
                context,
                graphiql: env.graphql.editor,
                formatError: error => ({
                    code: getErrorCode(error.message),
                    message: getErrorMessage(error.message),
                    path: error.path,
                }),
            })(request, response);
        });

    }
};
