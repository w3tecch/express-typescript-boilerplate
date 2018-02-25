import { AbstractGraphQLQuery } from './AbstractGraphQLQuery';

export abstract class AbstractGraphQLMutation<TContext, TResult, TArgs> extends AbstractGraphQLQuery<TContext, TResult, TArgs> {
}
