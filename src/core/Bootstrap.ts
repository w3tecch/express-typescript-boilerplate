import * as express from 'express';

import * as core from './';


export class Bootstrap {

    static getApp(): express.Application {
        const app = express();
        const config = core.Environment.getConfig();

        // Set serve configs for running it
        app.set('host', config.server.host);
        app.set('port', Bootstrap.normalizePort(config.server.port));
        return app;
    }

    static normalizePort(port: string): number | string | boolean {
        const parsedPort = parseInt(port, 10);
        if (isNaN(parsedPort)) { // named pipe
            return port;
        }
        if (parsedPort >= 0) { // port number
            return parsedPort;
        }
        return false;
    }

}
