import { AbstractGraphQLHooks } from './AbstractGraphQLHooks';


export abstract class AbstractQuery<TContext, TResult, TArgs> extends AbstractGraphQLHooks<TContext, TResult, TArgs> {

    /**
     * This will be called by graphQL and they need to have it not as a
     * member function of this class. We use this hook to add some more logic
     * to it, like permission checking and before and after hooks to alter some data.
     */
    public resolve = async <S>(root: S, args: TArgs, context: TContext): Promise<TResult> => {
        // We need to store the query arguments in the context so they can be accessed by subsequent resolvers
        (context as any).resolveArgs = args;
        args = await this.before(context, args);
        let result = await this.run<S>(root, args, context);
        result = await this.after(result, context, args);
        return (result as TResult);
    }

}
