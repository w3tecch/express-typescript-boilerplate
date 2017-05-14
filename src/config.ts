/**
 * APPLICATION CONFIGURATION
 * ----------------------------------------
 * Here you should define all your configurable stuff like logger, host for
 * other endpoints. So move all your config parts here.
 *
 * We use different environments for our configurations:
 *  - development:
 *      This is the local development environment, which is used by the developer's
 *
 *  - test:
 *      This environment is used by the unit, migration and database test.
 *
 *  - production:
 *      This configuration will be used by the cloud servers. You are abel to override
 *      them with the local cloud environment variable to make it even more configurable.
 */
export = <config.Environments>{
    /**
     * Development Environment
     */
    development: {
        database: {
            client: 'pg',
            connection: 'postgres://root:root@localhost:5432/my-database-dev',
            migrations: {
                directory: './src/database/migrations',
                tableName: 'version'
            },
            seeds: {
                directory: './src/database/seeds'
            }
        },
        auth0: {
            host: 'https://w3tecch.auth0.com',
            oauth: '/oauth',
            api: '/api/v2',
            client_id: 'auth0_client_id',
            client_secret: 'auth0_client_secret',
            audience: 'https://my.auth0.com/api/v2/',
            grant_type: 'client_credentials'
        },
        server: {
            host: 'localhost',
            port: process.env.PORT || '3000'
        },
        logger: {
            debug: 'app*',
            console: {
                level: 'debug'
            }
        }
    },
    /**
     * Test Environment
     */
    test: {
        database: {
            client: 'pg',
            connection: 'postgres://root:root@localhost:5432/my-database-test',
            migrations: {
                directory: './src/database/migrations',
                tableName: 'version'
            },
            seeds: {
                directory: './src/database/seeds'
            }
        },
        auth0: {
            host: 'https://w3tecch.auth0.com',
            oauth: '/oauth',
            api: '/api/v2',
            client_id: 'auth0_client_id',
            client_secret: 'auth0_client_secret',
            audience: 'https://my.auth0.com/api/v2/',
            grant_type: 'client_credentials'
        },
        server: {
            host: 'localhost',
            port: process.env.PORT || '3000'
        },
        logger: {
            debug: '',
            console: {
                level: 'none'
            }
        }
    },
    /**
     * Production Environment
     */
    production: {
        database: {
            client: 'pg',
            connection: 'postgres://root:root@localhost:5432/my-database',
            migrations: {
                directory: './src/database/migrations',
                tableName: 'version'
            },
            seeds: {
                directory: './src/database/seeds'
            }
        },
        auth0: {
            host: 'https://w3tecch.auth0.com',
            oauth: '/oauth',
            api: '/api/v2',
            client_id: 'auth0_client_id',
            client_secret: 'auth0_client_secret',
            audience: 'https://my.auth0.com/api/v2/',
            grant_type: 'client_credentials'
        },
        server: {
            host: 'localhost',
            port: process.env.PORT || '3000'
        },
        logger: {
            debug: '',
            console: {
                level: 'debug'
            }
        }
    }
};
