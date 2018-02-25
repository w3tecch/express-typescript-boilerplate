import * as dotenv from 'dotenv';
import * as jsonfile from 'jsonfile';
import * as path from 'path';

import { env } from '../src/env';

dotenv.config();

const content = {
    type: env.db.type,
    host: env.db.host,
    port: env.db.port,
    username: env.db.username,
    password: env.db.password,
    database: env.db.database,
    entities: env.app.dirs.entities,
    migrations: env.app.dirs.migrations,
    cli: {
        migrationsDir: env.app.dirs.migrationsDir,
    },
};

const filePath = path.join(process.cwd(), 'ormconfig.json');
jsonfile.writeFile(filePath, content, { spaces: 2 }, (err) => {
    if (err === null) {
        process.exit(0);
    } else {
        console.error('Failed to generate the ormconfig.json', err);
        process.exit(1);
    }
});
