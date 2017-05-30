/**
 * core.database.BluePrint
 * ------------------------------------------------
 */

import * as bookshelf from 'bookshelf';


export class BluePrint {
    constructor(
        public Model: typeof bookshelf.Model,
        public callback: (faker: Faker.FakerStatic, args: any[]) => any) { }
}
