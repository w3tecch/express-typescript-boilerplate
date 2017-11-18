/**
 * Environment variables
 */
export const env = {
    node: process.env.NODE_ENV || 'development',
    app: {
        name: getOsEnv('APP_NAME'),
        host: getOsEnv('APP_HOST'),
        port: normalizePort(getOsEnv('PORT') || getOsEnv('APP_PORT') || '3000'),
        routePrefix: getOsEnv('APP_ROUTE_PREFIX')
    },
    log: {
        level: getOsEnv('LOG_LEVEL'),
        json: toBool(getOsEnv('LOG_JSON'))
    },
    db: {
        type: getOsEnv('DB_TYPE'),
        host: getOsEnv('DB_HOST'),
        port: toNumber(getOsEnv('DB_PORT')),
        username: getOsEnv('DB_USERNAME'),
        password: getOsEnv('DB_PASSWORD'),
        database: getOsEnv('DB_DATABASE'),
        synchronize: toBool(getOsEnv('DB_SYNCHRONIZE')),
        logging: toBool(getOsEnv('DB_LOGGING'))
    }
};

function getOsEnv(key: string): string {
    return `${process.env[key]}`;
}

function toNumber(value: string): number {
    return parseInt(value, 10);
}

function toBool(value: string): boolean {
    return value === 'true';
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
