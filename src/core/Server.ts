import * as http from 'http';
import * as express from 'express';

import { Log } from './log';

const log = new Log('core:Server');

/**
 * The Server class is responsilbe to listen to http server
 * events and to react to it.
 *
 * @export
 * @class Server
 */
export class Server {

    /**
     * Listen to the given http server
     *
     * @static
     * @param {http.Server} httpServer
     * @param {express.Application} app
     *
     * @memberof Server
     */
    static use(httpServer: http.Server, app: express.Application): void {
        httpServer.on('listening', () => {
            Server.onStartUp(app);
        });
        httpServer.on('error', (error) => {
            Server.onError(httpServer, error);
        });
    }

    /**
     * This is called when the server has started and is ready.
     *
     * @static
     *
     * @memberof Server
     */
    static onStartUp(app: express.Application): void {
        log.info(`started on ${app.get('host')}:${app.get('port')}`);
    }

    /**
     * This is called when the server throws an error like the given
     * port is already used
     *
     * @static
     * @param {*} error
     *
     * @memberof Server
     */
    static onError(httpServer: http.Server, error: any): void {
        if (error.syscall !== 'listen') {
            throw error;
        }
        const addr = httpServer.address();
        switch (error.code) {
            case 'EACCES':
                log.error(`${this.bind(addr)} requires elevated privileges`);
                process.exit(1);
                break;
            case 'EADDRINUSE':
                log.error(`${this.bind(addr)} is already in use`);
                process.exit(1);
                break;
            default:
                throw error;
        }
    }

}
