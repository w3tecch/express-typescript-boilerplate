import * as knex from 'knex';

import { Environment } from './';
const databaseConfig = Environment.getConfig().database;


export const Knex: knex = knex({
    client: databaseConfig.client,
    connection: databaseConfig.connection,
    pool: { min: 0, max: 7 },
    migrations: {
        tableName: 'migrations'
    }
});
