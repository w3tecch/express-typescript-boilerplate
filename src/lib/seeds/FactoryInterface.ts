import * as Faker from 'faker';
import { ObjectType } from 'typeorm';
import { EntityFactoryInterface } from './EntityFactoryInterface';
import { Connection } from 'typeorm/connection/Connection';
import { SeedsConstructorInterface } from 'src/lib/seeds';
/**
 * This interface is used to define new entity faker factories or to get such a
 * entity faker factory to start seeding.
 */
export interface FactoryInterface {
    /**
     * Returns a typeorm database connection.
     */
    getConnection(): Connection;
    /**
     * Sets the typeorm database connection.
     */
    setConnection(connection: Connection): void;
    /**
     * Runs the given seed class
     */
    runSeed<T>(seedClass: SeedsConstructorInterface): Promise<T>;
    /**
     * Returns an EntityFactoryInterface
     */
    get<Entity>(entityClass: ObjectType<Entity>, value?: any): EntityFactoryInterface<Entity>;
    /**
     * Define an entity faker
     */
    define<Entity>(entityClass: ObjectType<Entity>, fakerFunction: (faker: typeof Faker, value?: any) => Entity): void;
}
