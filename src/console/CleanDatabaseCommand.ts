process.env.DEBUG = 'console*';

import * as Knex from 'knex';

import * as core from '../core';


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
                    this.log('✓ - ' + table + ' was successfully droped');
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
