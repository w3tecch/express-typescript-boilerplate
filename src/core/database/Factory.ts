import * as faker from 'faker';
import * as bookshelf from 'bookshelf';
import { BluePrint } from './BluePrint';
import { ModelFactory } from './ModelFactory';


export class Factory {

    private static instance: Factory;

    private blueprints: { [key: string]: BluePrint };

    public static getInstance(): Factory {
        if (!Factory.instance) {
            Factory.instance = new Factory(faker);
        }
        return Factory.instance;
    }

    constructor(private faker: Faker.FakerStatic) {
        this.blueprints = {};
    }

    public define(ModelStatic: typeof bookshelf.Model, callback: (faker: Faker.FakerStatic, args: any[]) => any): void {
        this.blueprints[this.getNameOfModel(ModelStatic)] = new BluePrint(ModelStatic, callback);
    }

    public get(ModelStatic: typeof bookshelf.Model, ...args: any[]): ModelFactory {
        return new ModelFactory(
            this.faker,
            this.blueprints[this.getNameOfModel(ModelStatic)],
            args
        );
    }

    private getNameOfModel(Model: typeof bookshelf.Model): string {
        return (new Model()).constructor.name;
    }

}
