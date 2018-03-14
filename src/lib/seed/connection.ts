import { Connection, createConnection } from 'typeorm';

const args = process.argv;
const runDir = process.cwd();

// Get cli parameter for logging
const logging = args.indexOf('--logging') >= 0 || args.indexOf('-L') >= 0 || false;

// Get cli parameter for ormconfig.json or another json file
const configParam = '--config';
const hasConfigPath = args.indexOf(configParam) >= 0 || false;
const indexOfConfigPath = args.indexOf(configParam) + 1;

/**
 * Returns a TypeORM database connection for our entity-manager
 */
export const getConnection = async (): Promise<Connection> => {
    const ormconfig = (hasConfigPath)
        ? require(`${args[indexOfConfigPath]}`)
        : require(`${runDir}/ormconfig.json`);
    ormconfig.logging = logging;

    return createConnection(ormconfig);
};
