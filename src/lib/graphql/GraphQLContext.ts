import * as DataLoader from 'dataloader';
import * as express from 'express';
import { Container } from 'typedi';

export interface GraphQLContext<TData, TResolveArgs> {
    container: typeof Container;
    request: express.Request;
    response: express.Response;
    dataLoaders: GraphQLContextDataLoader;
    resolveArgs?: TResolveArgs;
    data?: TData;
}

export interface GraphQLContextDataLoader {
    [key: string]: DataLoader<number | string, any>;
}
