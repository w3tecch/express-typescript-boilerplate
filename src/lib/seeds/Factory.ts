import * as Faker from 'faker';
import { ObjectType } from 'typeorm';
import { Connection } from 'typeorm/connection/Connection';
import { FactoryInterface } from './FactoryInterface';
import { EntityFactory } from './EntityFactory';
import { BluePrint } from './BluePrint';
import { SeedsConstructorInterface } from './SeedsInterface';


export class Factory implements FactoryInterface {

    public static getInstance(): Factory {
        if (!Factory.instance) {
            Factory.instance = new Factory(Faker);
        }
        return Factory.instance;
    }

    private static instance: Factory;

    private connection: Connection;
    private blueprints: { [key: string]: BluePrint<any> };

    constructor(private faker: typeof Faker) {
        this.blueprints = {};
    }

    public getConnection(): Connection {
        return this.connection;
    }

    public setConnection(connection: Connection): void {
        this.connection = connection;
    }

    public async runSeed<T>(seedClass: SeedsConstructorInterface): Promise<T> {
        const seeder = new seedClass();
        return await seeder.seed(this);
    }

    public define<Entity>(entityClass: ObjectType<Entity>, callback: (faker: typeof Faker, args: any[]) => Entity): void {
        this.blueprints[this.getNameOfEntity(entityClass)] = new BluePrint<Entity>(entityClass, callback);
    }

    public get<Entity>(entityClass: ObjectType<Entity>, ...args: any[]): EntityFactory<Entity> {
        return new EntityFactory<Entity>(
            this.faker,
            this.connection,
            this.blueprints[this.getNameOfEntity(entityClass)],
            args
        );
    }

    private getNameOfEntity(EntityClass: any): string {
        return new EntityClass().constructor.name;
    }

}
