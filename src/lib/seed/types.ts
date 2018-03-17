import * as Faker from 'faker';
import { Connection, ObjectType } from 'typeorm';

import { EntityFactory } from './EntityFactory';

/**
 * FactoryFunction is the fucntion, which generate a new filled entity
 */
export type FactoryFunction<Entity, Settings> = (faker: typeof Faker, settings?: Settings) => Entity;

/**
 * Factory gets the EntityFactory to the given Entity and pass the settings along
 */
export type Factory = <Entity, Settings>(entity: ObjectType<Entity>) => (settings?: Settings) => EntityFactory<Entity, Settings>;

/**
 * Seed are the class to create some data. Those seed are run by the cli.
 */
export interface Seed {
    seed(factory: Factory, connection: Connection): Promise<any>;
}

/**
 * Constructor of the seed class
 */
export interface SeedConstructor {
    new(): Seed;
}

/**
 * Value of our EntityFactory state
 */
export interface EntityFactoryDefinition<Entity, Settings> {
    entity: ObjectType<Entity>;
    factory: FactoryFunction<Entity, Settings>;
}
