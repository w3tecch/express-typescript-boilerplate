import * as knex from 'knex';
import { Environment } from './Environment';


export const Knex: knex = knex({
    client: Environment.get<string>('DB_CLIENT'),
    connection: Environment.get<string>('DB_CONNECTION'),
    pool: {
        min: Environment.get<number>('DB_POOL_MIN'),
        max: Environment.get<number>('DB_POOL_MAX')
    }
    // migrations: {
    //     tableName: Environment.get<string>('DB_MIGRATION_TABLE')
    // }
});
