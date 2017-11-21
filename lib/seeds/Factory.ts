import { ObjectType } from 'typeorm';
import * as Faker from 'faker';
import { FactoryInterface } from './FactoryInterface';
import { EntityFactory } from './EntityFactory';
import { BluePrint } from './BluePrint';


export class Factory implements FactoryInterface {

    public static getInstance(): Factory {
        if (!Factory.instance) {
            Factory.instance = new Factory(Faker);
        }
        return Factory.instance;
    }

    private static instance: Factory;

    private blueprints: { [key: string]: BluePrint<any> };

    constructor(private faker: typeof Faker) {
        this.blueprints = {};
    }

    public define<Entity>(entityClass: ObjectType<Entity>, callback: (faker: typeof Faker, args: any[]) => Entity): void {
        this.blueprints[this.getNameOfEntity(entityClass)] = new BluePrint<Entity>(entityClass, callback);
    }

    public get<Entity>(entityClass: ObjectType<Entity>, ...args: any[]): EntityFactory<Entity> {
        return new EntityFactory<Entity>(
            this.faker,
            this.blueprints[this.getNameOfEntity(entityClass)],
            args
        );
    }

    private getNameOfEntity(EntityClass: any): string {
        return new EntityClass().constructor.name;
    }

}
