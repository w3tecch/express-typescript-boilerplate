import * as pkg from '../../package.json';
import * as dotenv from 'dotenv';
dotenv.config();


/**
 * Environment variables
 */
export const env = {
    node: process.env.NODE_ENV || 'development',
    isProduction: process.env.NODE_ENV === 'production',
    app: {
        name: getOsEnv('APP_NAME'),
        version: (pkg as any).version,
        description: (pkg as any).description,
        route: getOsEnv('APP_ROUTE'),
        routePrefix: getOsEnv('APP_ROUTE_PREFIX'),
        port: normalizePort(process.env.PORT || '3000'),
        banner: toBool(getOsEnv('APP_BANNER')),
    },
    log: {
        level: getOsEnv('LOG_LEVEL'),
        json: toBool(getOsEnv('LOG_JSON')),
        output: getOsEnv('LOG_OUTPUT'),
    },
    auth: {
        route: getOsEnv('AUTH_ROUTE'),
    },
    db: {
        type: getOsEnv('DB_TYPE'),
        host: getOsEnv('DB_HOST'),
        port: toNumber(getOsEnv('DB_PORT')),
        username: getOsEnv('DB_USERNAME'),
        password: getOsEnv('DB_PASSWORD'),
        database: getOsEnv('DB_DATABASE'),
        synchronize: toBool(getOsEnv('DB_SYNCHRONIZE')),
        logging: toBool(getOsEnv('DB_LOGGING')),
        entities: toArray(getOsEnv('DB_ENTITIES')),
        migrations: toArray(getOsEnv('DB_MIGRATIONS')),
        migrationsDir: getOsEnv('DB_MIGRATIONS_DIR'),
    },
    swagger: {
        enabled: toBool(getOsEnv('SWAGGER_ENABLED')),
        route: getOsEnv('SWAGGER_ROUTE'),
        file: getOsEnv('SWAGGER_FILE'),
        username: getOsEnv('SWAGGER_USERNAME'),
        password: getOsEnv('SWAGGER_PASSWORD'),
    },
    monitor: {
        enabled: toBool(getOsEnv('MONITOR_ENABLED')),
        route: getOsEnv('MONITOR_ROUTE'),
        username: getOsEnv('MONITOR_USERNAME'),
        password: getOsEnv('MONITOR_PASSWORD'),
    },
};

function getOsEnv(key: string): string {
    return process.env[key] as string;
}

function toNumber(value: string): number {
    return parseInt(value, 10);
}

function toBool(value: string): boolean {
    return value === 'true';
}

function toArray(value: string): string[] {
    if (value && value.indexOf(',') >= 0) {
        return value.split(',');
    }
    return [value];
}

function normalizePort(port: string): number | string | boolean {
    const parsedPort = parseInt(port, 10);
    if (isNaN(parsedPort)) { // named pipe
        return port;
    }
    if (parsedPort >= 0) { // port number
        return parsedPort;
    }
    return false;
}
