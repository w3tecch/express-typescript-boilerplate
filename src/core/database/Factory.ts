/**
 * core.database.Factory
 * ------------------------------------------------
 */

import * as Faker from 'faker';
import * as bookshelf from 'bookshelf';
import { BluePrint } from './BluePrint';
import { ModelFactory } from './ModelFactory';


export class Factory {

    public static getInstance(): Factory {
        if (!Factory.instance) {
            Factory.instance = new Factory(Faker);
        }
        return Factory.instance;
    }

    private static instance: Factory;

    private blueprints: { [key: string]: BluePrint };

    constructor(private faker: Faker.FakerStatic) {
        this.blueprints = {};
    }

    public define(ModelStatic: any, callback: (faker: Faker.FakerStatic, args: any[]) => any): void {
        this.blueprints[this.getNameOfModel(ModelStatic)] = new BluePrint(ModelStatic, callback);
    }

    public get(ModelStatic: any, ...args: any[]): ModelFactory {
        return new ModelFactory(
            this.faker,
            this.blueprints[this.getNameOfModel(ModelStatic)],
            args
        );
    }

    private getNameOfModel(Model: typeof bookshelf.Model): string {
        return new Model().constructor.name;
    }

}
