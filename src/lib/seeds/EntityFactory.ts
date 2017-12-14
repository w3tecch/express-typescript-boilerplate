import * as Faker from 'faker';
import { Connection } from 'typeorm/connection/Connection';
import { EntityFactoryInterface } from './EntityFactoryInterface';
import { BluePrint } from './BluePrint';


export class EntityFactory<Entity> implements EntityFactoryInterface<Entity> {

    private identifier = 'id';
    private eachFn: (obj: any, faker: typeof Faker) => Promise<any>;

    constructor(
        private faker: typeof Faker,
        private connection: Connection,
        private blueprint: BluePrint<Entity>,
        private args: any[]) { }

    public each(iterator: (entity: Entity, faker: typeof Faker) => Promise<any>): EntityFactory<Entity> {
        this.eachFn = iterator;
        return this;
    }

    public async make(): Promise<Entity> {
        return await this.makeEntity(this.blueprint.create(this.faker, this.args));
    }

    public async makeMany(amount: number): Promise<Entity[]> {
        const results: Entity[] = [];
        for (let i = 0; i < amount; i++) {
            const entity = await this.makeEntity(this.blueprint.create(this.faker, this.args));
            if (entity) {
                results.push(entity);
            }
        }
        return results;
    }

    public async create(): Promise<Entity> {
        const entity = await this.build();
        if (typeof this.eachFn === 'function') {
            await this.eachFn(entity, this.faker);
        }
        return entity;
    }

    public async createMany(amount: number): Promise<Entity[]> {
        const results: Entity[] = [];
        for (let i = 0; i < amount; i++) {
            const entity = await this.create();
            if (entity) {
                results.push(entity);
            }
        }
        return results;
    }

    private async build(): Promise<any> {
        if (this.connection) {
            const entity = await this.make();
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
