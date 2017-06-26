/**
 * core.database.ModelFactory
 * ------------------------------------------------
 */

import { BluePrint } from './BluePrint';


export class ModelFactory {

    private identifier = 'id';
    private eachFn: (obj: any, faker: Faker.FakerStatic) => Promise<any>;

    constructor(
        private faker: Faker.FakerStatic,
        private blueprint: BluePrint,
        private args: any[]) {
    }

    public returning(identifier: string): ModelFactory {
        this.identifier = identifier;
        return this;
    }

    public each(iterator: (obj: any) => Promise<any>): ModelFactory {
        this.eachFn = iterator;
        return this;
    }

    public async create(amount: number = 1): Promise<any> {
        const results = [] as any;
        for (let i = 0; i < amount; i++) {
            const obj = await this.build();
            results.push(obj);
            if (typeof this.eachFn === 'function') {
                await this.eachFn(obj, this.faker);
            }
        }
        if (amount === 1) {
            return results[0];
        }
        return results;
    }

    private async build(): Promise<any> {
        const obj = await this.makeEntity(this.blueprint.callback(this.faker, this.args));
        return await new this.blueprint.Model(obj).save();
    }

    private async makeEntity(entity: any): Promise<any> {
        for (const attribute in entity) {
            if (entity.hasOwnProperty(attribute)) {
                if (typeof entity[attribute] === 'object' && entity[attribute] instanceof ModelFactory) {
                    const modelFactory: ModelFactory = entity[attribute];
                    const subEntity = await modelFactory.build();
                    entity[attribute] = subEntity[this.identifier];
                }
            }
        }
        return entity;
    }
}
