import * as Faker from 'faker';


/**
 * EntityFactoryInterface is the one we use in our seed files.
 * This will be returne of the main factory's get method.
 */
export interface EntityFactoryInterface<Entity> {
    /**
     * Creates a entity with faked data, but not persisted to the database.
     */
    make(): Promise<Entity>;
    makeMany(amount: number): Promise<Entity[]>;
    /**
     * Creates a new faked entity in the database.
     */
    create(): Promise<Entity>;
    createMany(amount: number): Promise<Entity[]>;
    /**
     * This is called after creating a enity to the database. Use this to
     * create other seeds but combined with this enitiy.
     */
    each(iterator: (entity: Entity, faker: typeof Faker) => Promise<any>): EntityFactoryInterface<Entity>;
}
