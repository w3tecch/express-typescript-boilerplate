import { createConnection, Connection } from 'typeorm';

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

    return await createConnection({
        type: (ormconfig as any).type as any,
        host: (ormconfig as any).host,
        port: (ormconfig as any).port,
        username: (ormconfig as any).username,
        password: (ormconfig as any).password,
        database: (ormconfig as any).database,
        entities: (ormconfig as any).entities,
        logging,
    });
};
