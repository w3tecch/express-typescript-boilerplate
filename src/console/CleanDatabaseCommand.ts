process.env.DEBUG = 'console*';

import * as Knex from 'knex';
import * as core from '../core';


/**
 * This command drop's all tables so we have a clean and
 * empty database in the end.
 *
 * @class CleanDatabaseCommand
 * @extends {core.Command}
 */
class CleanDatabaseCommand extends core.Command {

    private tables: string[] = [
        'users',
        'version',
        'version_lock'
    ];

    constructor(db: Knex) {
        super(db, 'CleanDatabaseCommand');
    }

    public run(): void {
        this.next();
    }

    private next(): void {
        const table = this.tables.shift();
        if (table) {
            this.db.schema.dropTable(table)
                .then(() => {
                    this.log('✓ - ' + table + ' was successfully dropped');
                    this.next();
                })
                .catch((e) => {
                    if (e.code === 'ER_BAD_TABLE_ERROR') {
                        this.next();
                    } else {
                        this.kill();
                    }
                });
        } else {
            this.done();
        }
    }
}

const command = new CleanDatabaseCommand(core.Knex);
command.run();
