declare module config {

    interface Environments {
        development: Configuration;
        test: Configuration;
        production: Configuration;
    }

    interface Configuration {
        database: DatabaseConfiguration;
        auth0: Auth0Configuration;
        server: ServerConfiguration;
        logger: LoggerConfiguration;
    }

    interface DatabaseConfiguration {
        client: string;
        connection?: string;
    }

    interface ServerConfiguration {
        host: string;
        port: string;
        graphiql: boolean;
    }

    interface LoggerConfiguration {
        host?: string;
        port?: string;
        file?: LoggerConsoleConfiguration;
        console: LoggerConsoleConfiguration;
        debug: string;
    }

    interface LoggerConsoleConfiguration {
        level: string;
    }

    interface Auth0Configuration {
        host: string;
        oauth: string;
        api: string;
        client_id: string;
        client_secret: string;
        audience: string;
        grant_type: string;
    }
}
