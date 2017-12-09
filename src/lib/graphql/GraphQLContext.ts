import * as express from 'express';
import { Container } from 'typedi';

export interface GraphQLContext<TData, TResolveArgs> {
    container: typeof Container;
    request: express.Request;
    response: express.Response;
    resolveArgs?: TResolveArgs;
    data?: TData;
}
