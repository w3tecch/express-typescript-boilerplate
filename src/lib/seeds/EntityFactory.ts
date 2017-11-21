import * as Faker from 'faker';
import { Connection } from 'typeorm';
import { EntityFactoryInterface } from './EntityFactoryInterface';
import { BluePrint } from './BluePrint';
import { getConnection } from './connection';


export class EntityFactory<Entity> implements EntityFactoryInterface<Entity> {

    private connection: Connection | undefined;
    private identifier = 'id';
    private eachFn: (obj: any, faker: typeof Faker) => Promise<any>;

    constructor(
        private faker: typeof Faker,
        private blueprint: BluePrint<Entity>,
        private args: any[]) { }

    public returning(identifier: string): EntityFactory<Entity> {
        this.identifier = identifier;
        return this;
    }

    public each(iterator: (entity: Entity, faker: typeof Faker) => Promise<any>): EntityFactory<Entity> {
        this.eachFn = iterator;
        return this;
    }

    public async create(amount: number = 1): Promise<Entity | Entity[] | undefined> {
        this.connection = await getConnection();
        if (this.connection) {
            const results: Entity[] = [];
            for (let i = 0; i < amount; i++) {
                const entity = await this.build();
                results.push(entity);
                if (typeof this.eachFn === 'function') {
                    await this.eachFn(entity, this.faker);
                }
            }
            await this.connection.close();
            if (amount === 1) {
                return results[0];
            }
            return results;
        }
        return;
    }

    private async build(): Promise<any> {
        if (this.connection) {
            const entity = await this.makeEntity(this.blueprint.callback(this.faker, this.args));
            const em = this.connection.createEntityManager();
            try {
                return await em.save(this.blueprint.EntityClass, entity);
            } catch (error) {
                console.error('saving entity failed', error);
                return;
            }
        }
        return;
    }

    private async makeEntity(entity: Entity): Promise<Entity> {
        for (const attribute in entity) {
            if (entity.hasOwnProperty(attribute)) {
                if (typeof entity[attribute] === 'object' && entity[attribute] instanceof EntityFactory) {
                    const subEntityFactory = entity[attribute];
                    const subEntity = await (subEntityFactory as any).build();
                    entity[attribute] = subEntity[this.identifier];
                }
            }
        }
        return entity;
    }

}
