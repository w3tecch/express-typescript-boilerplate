export function getOsEnv(key: string): string {
    if (typeof process.env[key] === 'undefined') {
        throw new Error('Environment variable ' + key + ' is not set.');
    } else {
        return process.env[key] as string;
    }
}

export function getOsEnvOptional(key: string): string | undefined {
    return process.env[key];
}

export function getOsEnvArray(key: string, delimiter: string = ','): string[] | boolean {
    return process.env[key] && process.env[key].split(delimiter) || false;
}

export function toNumber(value: string): number {
    return parseInt(value, 10);
}

export function toBool(value: string): boolean {
    return value === 'true';
}

export function normalizePort(port: string): number | string | boolean {
    const parsedPort = parseInt(port, 10);
    if (isNaN(parsedPort)) { // named pipe
        return port;
    }
    if (parsedPort >= 0) { // port number
        return parsedPort;
    }
    return false;
}
