import { Constructable, Container, Handler } from 'typedi';
import { ObjectType } from 'typeorm';

import { createDataLoader, CreateDataLoaderOptions } from '../lib/graphql';

export function DLoader<T>(obj: ObjectType<T>, options: CreateDataLoaderOptions = {}): ParameterDecorator {
    return (object, propertyKey, index) => {
        const dataLoader = () => createDataLoader(obj, options);
        const propertyName = propertyKey ? propertyKey.toString() : '';
        const fa: Constructable<T> = object as any;
        const handler: Handler<T> = {value: dataLoader, propertyName, object: fa , index};
        Container.registerHandler(handler);
    };
}

export * from '../lib/graphql';
