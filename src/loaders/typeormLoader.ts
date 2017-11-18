import { createConnection } from 'typeorm';
import { MicroframeworkSettings, MicroframeworkLoader } from 'microframework';
import { env } from '../core/env';
import { User } from '../api/models/User';


export const typeormLoader: MicroframeworkLoader = async (settings: MicroframeworkSettings | undefined) => {
    // @ts-ignore this
    const connection = await createConnection({
        type: env.db.type,
        host: env.db.host,
        port: env.db.port,
        username: env.db.username,
        password: env.db.password,
        database: env.db.database,
        synchronize: env.db.synchronize,
        logging: env.db.logging,
        entities: [
            User
        ]
    });

    if (settings) {
        settings.onShutdown(() => connection.close());
    }
};
