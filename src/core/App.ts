
import * as http from 'http';
import * as express from 'express';
import * as dotenv from 'dotenv';
import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import { Log } from './log';
import { LoggerConfig } from '../config/LoggerConfig';
import { Bootstrap } from './Bootstrap';
import { IoC } from './IoC';
import { AppConfig } from '../config/AppConfig';


export interface Configurable {
    configure(app: App): void;
}

export class App {

    private express: express.Application = express();
    private server: http.Server;
    private inversifyExpressServer: InversifyExpressServer;
    private ioc: IoC = new IoC();
    private log: Log = new Log(__filename);
    private bootstrap = new Bootstrap();

    constructor(public configurations: Configurable[]) {
        // It also loads the .env file into the 'process.env' variable.
        dotenv.config();
        // Configure the logger, because we need it already.
        const loggerConfig = new LoggerConfig();
        loggerConfig.configure();
        // Create express app
        this.log.info('Defining app...');
        this.bootstrap.defineExpressApp(this.express);
    }

    get IoC(): Container {
        return this.ioc.container;
    }

    get Express(): express.Application {
        return this.express;
    }

    get Server(): http.Server {
        return this.server;
    }

    public main(): void {
        this.log.info('Configuring app...');
        // Add express monitor app
        this.bootstrap.setupMonitor(this.express);
        // Configure the app config for all the middlewares
        const appConfig = new AppConfig();
        appConfig.configure(this);
        // Configure all custom configurations
        this.configurations.forEach((c) => c.configure(this));
        // Setup the ioc of inversify
        this.log.info('Binding IoC modules...');
        this.ioc.bindModules().then(() => {
            this.log.info('Setting up IoC...');
            this.inversifyExpressServer = this.bootstrap.setupInversifyExpressServer(this.express, this.ioc);
            this.express = this.bootstrap.bindInversifyExpressServer(this.express, this.inversifyExpressServer);
            this.bootstrap.setupCoreTools(this.express);
            this.log.info('Starting app...');
            this.bootstrap.startServer(this.express);
        });
    }


}
