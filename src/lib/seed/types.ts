import * as Faker from 'faker';
import { Connection, ObjectType } from 'typeorm';

import { EntityFactory } from './EntityFactory';

export type FactoryFunction<Entity, Settings> = (faker: typeof Faker, settings?: Settings) => Entity;

export type Factory = <Entity, Settings>(entity: Entity) => (settings?: Settings) => EntityFactory<Entity, Settings>;

export interface EntityFactoryDefinition<Entity, Settings> {
    entity: ObjectType<Entity>;
    factory: FactoryFunction<Entity, Settings>;
}

export interface Seed {
    seed(factory: Factory, connection: Connection): Promise<any>;
}

export interface SeedConstructor {
    new(): Seed;
}
