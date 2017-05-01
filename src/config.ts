export = <config.Environments>{
    /**
     * Development Environment
     * ------------------------------------------
     *
     * This is the local development environment, which is used by the developoers
     */
    development: {
        database: {
            connection: 'mysql://root@localhost:3306/my-database-dev',
            client: 'mysql',
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
            port: process.env.PORT || '3000',
            graphiql: true
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
     * ------------------------------------------
     *
     * This environment is used by the unit, migration and database test.
     */
    test: {
        database: {
            connection: 'mysql://root:root@localhost:3306/my-database-test',
            client: 'mysql',
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
            port: process.env.PORT || '3000',
            graphiql: false
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
     * ------------------------------------------
     *
     * This configuration will be used by the cloud servers. You are abel to override
     * them with the local cloud environment variable to make it even more configurable.
     */
    production: {
        database: {
            connection: 'mysql://root:root@localhost:3306/my-database-prod',
            client: 'mysql',
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
            port: process.env.PORT || '3000',
            graphiql: false
        },
        logger: {
            debug: '',
            console: {
                level: 'debug'
            }
        }
    }
};
