import { Container } from 'typedi';
import { createConnection, useContainer, Connection } from 'typeorm';
import { env } from '../../../src/core/env';

export const createDatabaseConnection = async (): Promise<Connection> => {
    useContainer(Container);
    const connection = await createConnection({
        type: env.db.type as any, // See createConnection options for valid types
        database: env.db.database,
        logging: env.db.logging,
        entities: env.app.dirs.entities,
    });
    return connection;
};

export const synchronizeDatabase = (connection: Connection) => {
    return connection.synchronize(true);
};

export const closeDatabase = (connection: Connection) => {
    return connection.close();
};
