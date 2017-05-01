import * as Debug from 'debug';
import * as Knex from 'knex';


export class Command {

    protected log: Debug.IDebugger;
    protected db: Knex;

    constructor(db: Knex, name: string) {
        this.log = Debug('console:' + name);
        this.db = db;
        this.log('Starting');
    }

    public run(): void {
        throw new Error('run implementatin is missing');
    };

    protected done(): void {
        this.log('Finished');
        process.exit(0);
    }

    protected kill(): void {
        this.log('Finished with an error');
        process.exit(1);
    }

}
