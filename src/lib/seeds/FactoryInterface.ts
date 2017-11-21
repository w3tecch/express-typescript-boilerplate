import * as Faker from 'faker';
import { ObjectType } from 'typeorm';
import { EntityFactoryInterface } from './EntityFactoryInterface';
/**
 * This interface is used to define new entity faker factories or to get such a
 * entity faker factory to start seeding.
 */
export interface FactoryInterface {
    /**
     * Returns an EntityFactoryInterface
     */
    get<Entity>(entityClass: ObjectType<Entity>, args: any[]): EntityFactoryInterface<Entity>;
    /**
     * Define an entity faker
     */
    define<Entity>(entityClass: ObjectType<Entity>, fakerFunction: (faker: typeof Faker, args: any[]) => Entity): void;
}
