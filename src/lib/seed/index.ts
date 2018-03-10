import 'reflect-metadata';
import { Connection, ObjectType } from 'typeorm';

import { EntityFactory } from './EntityFactory';
import { EntityFactoryDefinition, FactoryFunction, SeedConstructor } from './types';
import { getNameOfClass } from './utils';

// -------------------------------------------------------------------------
// Handy Exports
// -------------------------------------------------------------------------

export * from './importer';

// -------------------------------------------------------------------------
// Types & Variables
// -------------------------------------------------------------------------

(global as any).seeder = {
    connection: undefined,
    entityFactories: new Map<string, EntityFactoryDefinition<any, any>>(),
};

// -------------------------------------------------------------------------
// Util functions
// -------------------------------------------------------------------------

// -------------------------------------------------------------------------
// Facade functions
// -------------------------------------------------------------------------

export const setConnection = (connection: Connection) => (global as any).seeder.connection = connection;

export const getConnection = () => (global as any).seeder.connection;

export const define = <Entity, Settings>(entity: ObjectType<Entity>, factoryFn: FactoryFunction<Entity, Settings>) => {
    (global as any).seeder.entityFactories.set(getNameOfClass(entity), { entity, factory: factoryFn });
};

export const factory = <Entity, Settings>(entity: any) => (settings?: Settings) => {
    const name = getNameOfClass(entity);
    const entityFactoryObject = (global as any).seeder.entityFactories.get(name);
    return new EntityFactory<Entity, Settings>(
        name,
        entity,
        entityFactoryObject.factory,
        settings
    );
};

export const seed = async <Entity, Settings>(entityFactory: EntityFactory<Entity, Settings>): Promise<Entity> => {
    const connection: Connection = (global as any).seeder.connection;
    if (connection) {
        const em = connection.createEntityManager();
        try {
            const entity = await entityFactory.make();
            return await em.save<Entity>(entityFactory.entity, entity);
        } catch (error) {
            throw new Error('Could not save entity');
        }
    } else {
        throw new Error('No db connection is given');
    }
};

export const runSeeder = async <T>(seederConstructor: SeedConstructor): Promise<T> => {
    const seeder = new seederConstructor();
    return seeder.seed(factory, getConnection());
};
