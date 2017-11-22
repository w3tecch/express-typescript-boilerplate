/**
 * core.Server
 * ------------------------------------
 *
 * The Server class is responsible to listen to http server
 * events and to react to it.
 */

import * as http from 'http';
import * as express from 'express';
import { Logger } from './Logger';
import { Environment } from './helpers/Environment';
import { SwaggerUI } from './SwaggerUI';
import { ApiMonitor } from './ApiMonitor';
import { ApiInfo } from './ApiInfo';


export class Server {

    /**
     * Normalize port for the express application
     *
     * @param {string} port
     * @returns {(number | string | boolean)}
     *
     * @memberof Server
     */
    public static normalizePort(port: string): number | string | boolean {
        const parsedPort = parseInt(port, 10);
        if (isNaN(parsedPort)) { // named pipe
            return port;
        }
        if (parsedPort >= 0) { // port number
            return parsedPort;
        }
        return false;
    }

    private log = new Logger(__filename);

    constructor(public httpServer: http.Server) { }

    /**
     * Listen to the given http server
     *
     * @param {http.Server} httpServer
     * @param {express.Application} app
     *
     * @memberof Server
     */
    public use(app: express.Application): void {
        this.httpServer.on('listening', () => {
            this.onStartUp(app);
        });
        this.httpServer.on('error', (error) => {
            this.onError(error);
        });
    }

    /**
     * This is called when the server has started and is ready.
     *
     *
     * @memberof Server
     */
    public onStartUp(app: express.Application): void {
        this.log.debug(``);
        this.log.debug(`Aloha, your app is ready on ${app.get('host')}${process.env.APP_URL_PREFIX}`);
        this.log.debug(`To shut it down, press <CTRL> + C at any time.`);
        this.log.debug(``);
        this.log.debug('-------------------------------------------------------');
        this.log.debug(`Environment  : ${Environment.getNodeEnv()}`);
        this.log.debug(`Version      : ${Environment.getPkg().version}`);
        this.log.debug(``);
        if (Environment.isTruthy(process.env.API_INFO_ENABLED as string)) {
            this.log.debug(`API Info     : ${app.get('host')}${ApiInfo.getRoute()}`);
        }
        if (Environment.isTruthy(process.env.SWAGGER_ENABLED as string)) {
            this.log.debug(`Swagger      : ${app.get('host')}${SwaggerUI.getRoute()}`);
        }
        if (Environment.isTruthy(process.env.MONITOR_ENABLED as string)) {
            this.log.debug(`Monitor      : ${app.get('host')}${ApiMonitor.getRoute()}`);
        }
        this.log.debug('-------------------------------------------------------');
        this.log.debug('');
    }

    /**
     * This is called when the server throws an error like the given
     * port is already used
     *
     * @param {*} error
     *
     * @memberof Server
     */
    public onError(error: any): void {
        if (error.syscall !== 'listen') {
            throw error;
        }
        switch (error.code) {
            case 'EACCES':
                this.log.error(`The Server requires elevated privileges`);
                process.exit(1);
                break;
            case 'EADDRINUSE':
                this.log.error(`Port is already in use or blocked by the os`);
                process.exit(1);
                break;
            default:
                throw error;
        }
    }

}
