import * as http from 'http';
import * as express from 'express';
import { Log } from './log';
import { Environment } from './Environment';

const log = new Log('core:Server');

/**
 * The Server class is responsible to listen to http server
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
        log.info(``);
        log.info(`Aloha, your app is ready on ${app.get('host')}:${app.get('port')}`);
        log.info(`To shut it down, press <CTRL> + C at any time.`);
        log.info(``);
        log.debug('-------------------------------------------------------');
        log.debug(`Environment  : ${Environment.getNodeEnv()}`);
        log.debug(`Version      : ${Environment.getPkg().version}`);
        log.debug(``);
        if (Environment.get<string>('API_INFO_ENABLED') === 'true') {
            log.debug(`API Info     : ${app.get('host')}:${app.get('port')}${process.env.APP_URL_PREFIX}${process.env.API_INFO_ROUTE}`);
        }
        if (Environment.get<string>('SWAGGER_ENABLED') === 'true') {
            log.debug(`Swagger      : ${app.get('host')}:${app.get('port')}${process.env.APP_URL_PREFIX}${process.env.SWAGGER_ROUTE}`);
        }
        if (Environment.get<string>('MONITOR_ENABLED') === 'true') {
            log.debug(`Monitor      : ${app.get('host')}:${app.get('port')}${process.env.APP_URL_PREFIX}${process.env.MONITOR_ROUTE}`);
        }
        log.debug('-------------------------------------------------------');
        log.debug('');
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
                log.error(`Port is already in use`);
                process.exit(1);
                break;
            default:
                throw error;
        }
    }

}
