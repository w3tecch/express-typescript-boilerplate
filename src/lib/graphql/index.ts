import * as DataLoader from 'dataloader';
import * as express from 'express';
import * as GraphQLHTTP from 'express-graphql';
import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { Container as container, ObjectType } from 'typedi';
import { getCustomRepository, getRepository, Repository } from 'typeorm';

import { getFromContainer } from './container';
import { getErrorCode, getErrorMessage, handlingErrors } from './graphql-error-handling';
import { GraphQLContext, GraphQLContextDataLoader } from './GraphQLContext';
import { importClassesFromDirectories } from './importClassesFromDirectories';
import { MetadataArgsStorage } from './MetadataArgsStorage';

// -------------------------------------------------------------------------
// Main exports
// -------------------------------------------------------------------------

export * from './Query';
export * from './Mutation';

export * from './AbstractGraphQLHooks';
export * from './AbstractGraphQLQuery';
export * from './GraphQLContext';
export * from './graphql-error-handling';
export * from './container';

// -------------------------------------------------------------------------
// Main Functions
// -------------------------------------------------------------------------

export interface CreateDataLoaderOptions {
    method?: string;
    key?: string;
    multiple?: boolean;
}

/**
 * Creates a new dataloader with the typorm repository
 */
export function createDataLoader<T>(obj: ObjectType<T>, options: CreateDataLoaderOptions = {}): DataLoader<any, any> {
    let repository;
    try {
        repository = getCustomRepository<Repository<any>>(obj);
    } catch (errorRepo) {
        try {
            repository = getRepository(obj);
        } catch (errorModel) {
            throw new Error('Could not create a dataloader, because obj is nether model or repository!');
        }
    }

    return new DataLoader(async (ids: number[]) => {
        let items = [];
        if (options.method) {
            items = await repository[options.method](ids);
        } else {
            items = await repository.findByIds(ids);
        }

        const handleBatch = (arr: any[]) => options.multiple === true ? arr : arr[0];
        return ids.map(id => handleBatch(items.filter(item => item[options.key || 'id'] === id)));
    });
}

/**
 * Defines the options to create a GraphQLServer
 */
export interface GraphQLServerOptions<TData> {
    queries: string[];
    mutations: string[];
    route?: string;
    dataLoaders?: GraphQLContextDataLoader;
    editorEnabled?: boolean;
    contextData?: TData;
}

/**
 * Create GraphQL Server and bind it to the gieven express app
 */
export function createGraphQLServer<TData>(expressApp: express.Application, options: GraphQLServerOptions<TData>): void {
    // collect queries & mutaions for our graphql schema
    const schema = createSchema({
        queries: options.queries,
        mutations: options.mutations,
    });

    // Handles internal errors and prints the stack to the console
    handlingErrors(schema);

    // Add graphql layer to the express app
    expressApp.use(options.route || '/graphql', (request: express.Request, response: express.Response) => {

        // Build GraphQLContext
        const context: GraphQLContext<TData, {}> = {
            container,
            request,
            response,
            dataLoaders: options.dataLoaders || {},
            resolveArgs: {},
            data: options.contextData,
        };

        // Setup GraphQL Server
        GraphQLHTTP({
            schema,
            context,
            graphiql: options.editorEnabled || true,
            formatError: error => ({
                code: getErrorCode(error.message),
                message: getErrorMessage(error.message),
                path: error.path,
            }),
        })(request, response);
    });
}

/**
 * Gets metadata args storage.
 * Metadata args storage follows the best practices and stores metadata in a global variable.
 */
export function getMetadataArgsStorage(): MetadataArgsStorage {
    if (!(global as any).graphqlMetadataArgsStorage) {
        (global as any).graphqlMetadataArgsStorage = new MetadataArgsStorage();
    }

    return (global as any).graphqlMetadataArgsStorage;
}

/**
 * Create query name out of the class name
 */
export function createQueryName(name: string): string {
    return lowercaseFirstLetter(removeSuffix(name, 'Query'));
}

/**
 * Create mutation name out of the class name
 */
export function createMutationName(name: string): string {
    return lowercaseFirstLetter(removeSuffix(name, 'Mutation'));
}

/**
 * Removes the suffix
 */
export function removeSuffix(value: string, suffix: string): string {
    return value.slice(0, value.length - suffix.length);
}

/**
 * LowerCase first letter
 */
export function lowercaseFirstLetter(s: string): string {
    return s.charAt(0).toLowerCase() + s.slice(1);
}

/**
 * GraphQL schema options for building it
 */
export interface GraphQLSchemaOptions {
    queries: string[];
    mutations: string[];
}

/**
 * Create schema out of the @Query and @Mutation
 */
export function createSchema(options: GraphQLSchemaOptions): GraphQLSchema {

    // import all queries
    let queryClasses: Array<() => void> = [];
    if (options && options.queries && options.queries.length) {
        queryClasses = (options.queries as any[]).filter(query => query instanceof Function);
        const queryDirs = (options.queries as any[]).filter(query => typeof query === 'string');
        queryClasses.push(...importClassesFromDirectories(queryDirs));
    }

    const queries = {};
    getMetadataArgsStorage().queries.forEach(queryMetdadata => {
        queries[createQueryName(queryMetdadata.name)] = getFromContainer(queryMetdadata.target);
    });

    const RootQuery = new GraphQLObjectType({
        name: 'Query',
        fields: queries,
    });

    // import all mutations
    let mutationClasses: Array<() => void> = [];
    if (options && options.mutations && options.mutations.length) {
        mutationClasses = (options.mutations as any[]).filter(mutation => mutation instanceof Function);
        const mutationDirs = (options.mutations as any[]).filter(mutation => typeof mutation === 'string');
        mutationClasses.push(...importClassesFromDirectories(mutationDirs));
    }

    const mutations = {};
    getMetadataArgsStorage().mutations.forEach(mutationMetdadata => {
        mutations[createMutationName(mutationMetdadata.name)] = getFromContainer(mutationMetdadata.target);
    });

    const RootMutation: GraphQLObjectType = new GraphQLObjectType({
        name: 'Mutation',
        fields: mutations,
    });

    const schemaOptions: any = {};

    if (queryClasses && queryClasses.length) {
        schemaOptions.query = RootQuery;
    }

    if (mutationClasses && mutationClasses.length) {
        schemaOptions.mutation = RootMutation;
    }

    return new GraphQLSchema(schemaOptions);

}
