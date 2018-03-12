import 'reflect-metadata';
import { Connection, ObjectType } from 'typeorm';

import { EntityFactory } from './EntityFactory';
import { EntityFactoryDefinition, Factory, FactoryFunction, SeedConstructor } from './types';
import { getNameOfClass } from './utils';

// -------------------------------------------------------------------------
// Handy Exports
// -------------------------------------------------------------------------

export * from './importer';
export { Factory, Seed } from './types';
export { times } from './utils';

// -------------------------------------------------------------------------
// Types & Variables
// -------------------------------------------------------------------------

(global as any).seeder = {
    connection: undefined,
    entityFactories: new Map<string, EntityFactoryDefinition<any, any>>(),
};

// -------------------------------------------------------------------------
// Facade functions
// -------------------------------------------------------------------------

/**
 * Adds the typorm connection to the seed options
 */
export const setConnection = (connection: Connection) => (global as any).seeder.connection = connection;

/**
 * Returns the typorm connection from our seed options
 */
export const getConnection = () => (global as any).seeder.connection;

/**
 * Defines a new entity factory
 */
export const define = <Entity, Settings>(entity: ObjectType<Entity>, factoryFn: FactoryFunction<Entity, Settings>) => {
    (global as any).seeder.entityFactories.set(getNameOfClass(entity), { entity, factory: factoryFn });
};

/**
 * Gets a defined entity factory and pass the settigns along to the entity factory function
 */
export const factory: Factory = <Entity, Settings>(entity: ObjectType<Entity>) => (settings?: Settings) => {
    const name = getNameOfClass(entity);
    const entityFactoryObject = (global as any).seeder.entityFactories.get(name);
    return new EntityFactory<Entity, Settings>(
        name,
        entity,
        entityFactoryObject.factory,
        settings
    );
};

/**
 * Runs a seed class
 */
export const runSeed = async <T>(seederConstructor: SeedConstructor): Promise<T> => {
    const seeder = new seederConstructor();
    return seeder.seed(factory, getConnection());
};
