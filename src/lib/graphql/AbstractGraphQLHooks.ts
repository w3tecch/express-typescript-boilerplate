import { UserError } from './graphql-error-handling';

// export interface GraphQLHooks {
//     before<C, A, S>(context: C, args: A, source?: S): Promise<A> | A;
//     after<R, C, A, S>(result: R, context: C, args: A, source?: S): Promise<R> | R;
//     run<S, A, C, R>(rootOrSource: S, args: A, context: C): Promise<R> | Promise<undefined> | R | undefined;
// }implements GraphQLHooks

export abstract class AbstractGraphQLHooks<TContext, TResult, TArgs>  {

    /**
     * This is our before hook. Here you are able
     * to alter the args object before the actual resolver(execute)
     * will be called.
     */
    public before<S>(context: TContext, args: TArgs, source?: S): Promise<TArgs> | TArgs {
        return args;
    }

    /**
     * This our after hook. It will be called ater the actual resolver(execute).
     * There you are able to alter the result before it is send to the client.
     */
    public after<S>(result: TResult, context: TContext, args?: TArgs, source?: S): Promise<TResult> | TResult {
        return result;
    }

    /**
     * This our resolver, which should gather the needed data;
     */
    public run<S>(rootOrSource: S, args: TArgs, context: TContext): Promise<TResult> | TResult {
        throw new UserError('Query not implemented!');
    }

}
