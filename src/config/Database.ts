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


export const Knex = (): knex => knex({
    client: process.env.DB_CLIENT,
    connection: process.env.DB_CONNECTION,
    pool: {
        min: parseInt(process.env.DB_POOL_MIN, 10),
        max: parseInt(process.env.DB_POOL_MAX, 10)
    }
});

export const Bookshelf: bookshelf = bookshelf(<any>Knex());
Bookshelf.plugin(['bookshelf-camelcase']);
