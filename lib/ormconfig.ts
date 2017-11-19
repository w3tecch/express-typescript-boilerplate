import * as dotenv from 'dotenv';
dotenv.config();

import * as path from 'path';
import * as jsonfile from 'jsonfile';
import { env } from '../src/core/env';


const content = {
    type: env.db.type,
    host: env.db.host,
    port: env.db.port,
    username: env.db.username,
    password: env.db.password,
    database: env.db.database,
    entities: env.db.entities,
    migrations: env.db.migrations,
    cli: {
        migrationsDir: env.db.migrationsDir
    }
};

const filePath = path.join(__dirname, '../', 'ormconfig.json');
jsonfile.writeFile(filePath, content, { spaces: 2 }, (err) => {
    if (err === null) {
        console.log('Successfully generated ormconfig.json form the .env file');
    } else {
        console.error('Failed to generate the ormconfig.json', err);
    }
});
