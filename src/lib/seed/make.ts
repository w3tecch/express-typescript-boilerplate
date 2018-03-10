import * as Faker from 'faker';

import { EntityFactoryDefinition } from './types';
import { isPromiseLike } from './utils';

const resolveEntity = async <E>(entity: E): Promise<E> => {
    for (const attribute in entity) {
        if (entity.hasOwnProperty(attribute)) {
            if (isPromiseLike(entity[attribute])) {
                entity[attribute] = await entity[attribute];
            }

            if (typeof entity[attribute] === 'object') {
                const subEntityFactory = entity[attribute];
                try {
                    entity[attribute] = await (subEntityFactory as any).make();
                } catch (e) {
                    throw new Error(`Could not make ${(subEntityFactory as any).name}`);
                }
            }
        }
    }
    return entity;
};

export const make = <E, Settings>(entityFactoryDefinition: EntityFactoryDefinition<E, Settings>) => (settings?: Settings) => () => {
    if (entityFactoryDefinition) {
        return resolveEntity(entityFactoryDefinition.factory(Faker, settings));
    }
    throw new Error('Could not found entity');
};
