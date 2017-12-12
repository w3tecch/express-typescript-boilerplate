import { createDatabaseConnection } from './../../integration/utils/database';
import { Connection } from 'typeorm/connection/Connection';
import { createConnection } from 'typeorm';
import { MicroframeworkSettings, MicroframeworkLoader } from 'microframework-w3tec';
import { env } from '../../../src/core/env';


export const typeormLoader: MicroframeworkLoader = async (settings: MicroframeworkSettings | undefined) => {

    const connection = await createDatabaseConnection();
    if (settings) {
        settings.setData('connection', connection);
        settings.onShutdown(() => connection.close());
    }
};
