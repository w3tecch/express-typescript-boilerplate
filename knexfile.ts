import * as dotenv from 'dotenv';
dotenv.config();

/**
 * This is the database configuration for the migrations and
 * the seeders.
 */
module.exports = {
    client: process.env.DB_CLIENT,
    connection: process.env.DB_CONNECTION,
    migrations: {
        directory: process.env.DB_MIGRATION_DIR,
        tableName: process.env.DB_MIGRATION_TABLE
    },
    seeds: {
        directory: process.env.DB_SEEDS_DIR
    }
};
