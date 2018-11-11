import { Container, ObjectType } from 'typedi';

import { createDataLoader, CreateDataLoaderOptions } from '../lib/graphql';

export function DLoader<T>(obj: ObjectType<T>, options: CreateDataLoaderOptions = {}): ParameterDecorator {
    return (object, propertyKey, index) => {
        const dataLoader = createDataLoader(obj, options);
        const propertyName = propertyKey ? propertyKey.toString() : '';
        Container.registerHandler({ object, propertyName, index, value: () => dataLoader });
    };
}

export * from '../lib/graphql';
