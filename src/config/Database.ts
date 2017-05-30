/**
 * config.Database
 * ------------------------------------
 *
 * Here we configure our database connection and
 * our ORM 'bookshelf'.
 *
 * Here would be the place to add more bookshelf plugins.
 */

import * as knex from 'knex';
import * as bookshelf from 'bookshelf';
import { Environment } from '../core/Environment';


export const Knex = (): knex => knex({
    client: Environment.get<string>('DB_CLIENT'),
    connection: Environment.get<string>('DB_CONNECTION'),
    pool: {
        min: Environment.get<number>('DB_POOL_MIN'),
        max: Environment.get<number>('DB_POOL_MAX')
    }
});

export const Bookshelf: bookshelf = bookshelf(<any>Knex());
Bookshelf.plugin(['bookshelf-camelcase']);
