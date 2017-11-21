import * as Faker from 'faker';

/**
 * EntityFactoryInterface is the one we use in our seed files.
 * This will be returne of the main factory's get method.
 */
export interface EntityFactoryInterface<Entity> {
    /**
     * Creates an amount (default 1) of the defined entity.
     */
    create(amount: number): Promise<Entity | Entity[] | undefined>;
    /**
     * Returns the identifier of the created entity.
     */
    returning(identifier: string): EntityFactoryInterface<Entity>;
    /**
     * This is called after creating a enity to the database. Use this to
     * create other seeds but combined with this enitiy.
     */
    each(iterator: (entity: Entity, faker: typeof Faker) => Promise<any>): EntityFactoryInterface<Entity>;
}
