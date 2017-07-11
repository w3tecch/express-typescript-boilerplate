import { Logger } from '../core/Logger';

import * as Knex from 'knex';
import { AbstractCommand } from './lib/AbstractCommand';
import { DatabaseConfig } from '../config/Database';

const log = new Logger(__filename);


/**
 * DatabaseResetCommand rollback all current migrations and
 * then migrate to the latest one.
 *
 * @export
 * @class DatabaseResetCommand
 */
export class DatabaseResetCommand extends AbstractCommand {

    public static command = 'db:reset';
    public static description = 'Reverse all current migrations and migrate to latest.';

    public async run(): Promise<void> {
        const knex = Knex(DatabaseConfig as Knex.Config);

        const migrate: any = knex.migrate;

        // Force unlock in case of bad state
        await migrate.forceFreeMigrationsLock();

        // Get completed migrations
        log.info('Get completed migrations');
        const completedMigrations = await migrate._listCompleted();

        // Rollback migrations
        log.info('Rollback migrations');
        await migrate._waterfallBatch(0, completedMigrations.reverse(), 'down');

        // Migrate to latest
        log.info('Migrate to latest');
        await migrate.latest();

        // Close connection to the database
        await knex.destroy();
        log.info('Done');
    }

}


