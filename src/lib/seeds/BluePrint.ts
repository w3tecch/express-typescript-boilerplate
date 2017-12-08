import * as Faker from 'faker';
import { ObjectType } from 'typeorm';


/**
 * BluePrint has the factory function for the given EntityClass
 */
export class BluePrint<Entity> {
    constructor(
        public EntityClass: ObjectType<Entity>,
        public create: (faker: typeof Faker, args: any[]) => Entity) { }
}
