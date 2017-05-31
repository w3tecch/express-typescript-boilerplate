/**
 * core.Bootstrap
 * ------------------------------------
 *
 * This class helps us to create an express app very easy and moreover
 * to give us a better possibility to extend the bootstrap process.
 *
 * We also setup the swagger documentation, api info route and the
 * small monitor app.
 */

import * as fs from 'fs';
import * as http from 'http';
import * as express from 'express';
import * as monitor from 'express-status-monitor';
import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import { Environment } from './Environment';
import { my } from 'my-express';
import { exceptionHandler, extendExpressResponse } from './api';
import { events } from './api/events';
import { Server } from './Server';
import { ioc } from './IoC';
import { Log } from './log';
import '../container';

const log = new Log('core:Bootstrap');


export class Bootstrap {

    public app: express.Application;
    public server: http.Server;
    public inversifyExpressServer: InversifyExpressServer;

    public appConfiguration: (app: express.Application) => express.Application;

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

    constructor() {
        log.info('Defining app...');
        this.defineExpressApp();
    }

    public async main(): Promise<void> {
        log.info('Configuring app...');
        this.app = this.appConfiguration(this.app);

        await this.bindIoC();
        this.setupIoC();
        this.startServer();
    }

    public configureExpress(configuration: (app: express.Application) => express.Application): void {
        this.appConfiguration = configuration;
    }

    private defineExpressApp(): void {
        this.app = express();
        this.app.set('host', Environment.get('APP_HOST'));
        this.app.set('port', Bootstrap.normalizePort(Environment.get<string>('PORT') || Environment.get<string>('APP_PORT')));
    }

    private async bindIoC(): Promise<void> {
        log.info('Binding IoC modules...');
        try {
            await ioc.bindModules();
        } catch (error) {
            // TODO
            console.error(error);
        }
    }

    private setupIoC(): void {
        log.info('Setting up IoC...');
        this.inversifyExpressServer = new InversifyExpressServer(ioc.Container, undefined, {
            rootPath: Environment.get<string>('APP_URL_PREFIX')
        }, this.app);
        this.inversifyExpressServer.setConfig((a) => a.use(extendExpressResponse));
        this.inversifyExpressServer.setErrorConfig((a) => a.use(exceptionHandler));
        this.app = this.inversifyExpressServer.build();
    }

    private startServer(): void {
        log.info('Starting app...');
        this.server = this.app.listen(this.app.get('port'));
        Server.use(this.server, this.app);
    }

}

export const bootstrap = new Bootstrap();
