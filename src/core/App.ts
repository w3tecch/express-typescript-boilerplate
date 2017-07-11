import * as express from 'express';
import * as dotenv from 'dotenv';
import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import { Logger } from './Logger';
import { LoggerConfig } from '../config/LoggerConfig';
import { Bootstrap } from './Bootstrap';
import { Server } from './Server';
import { IoC } from './IoC';
import { AppConfig } from '../config/AppConfig';


export interface Configurable {
    configure(app: App): void;
}

export class App {

    private express: express.Application = express();
    private server: Server;
    private inversifyExpressServer: InversifyExpressServer;
    private ioc: IoC = new IoC();
    private log: Logger = new Logger(__filename);
    private bootstrapApp = new Bootstrap();
    private configurations: Configurable[] = [];

    constructor() {
        // It also loads the .env file into the 'process.env' variable.
        dotenv.config();
        // Configure the logger, because we need it already.
        const loggerConfig = new LoggerConfig();
        loggerConfig.configure();
        // Create express app
        this.log.info('Defining app...');
        this.bootstrapApp.defineExpressApp(this.express);
    }

    get IoC(): Container {
        return this.ioc.container;
    }

    get Express(): express.Application {
        return this.express;
    }

    get Server(): Server {
        return this.server;
    }

    public Logger(scope: string): Logger {
        return new Logger(scope || __filename);
    }

    public configure(configurations: Configurable): void {
        this.configurations.push(configurations);
    }

    public async bootstrap(): Promise<void> {
        this.log.info('Configuring app...');
        // Add express monitor app
        this.bootstrapApp.setupMonitor(this.express);
        // Configure the app config for all the middlewares
        const appConfig = new AppConfig();
        appConfig.configure(this);
        // Configure all custom configurations
        this.configurations.forEach((c) => c.configure(this));
        // Setup the ioc of inversify
        this.log.info('Binding IoC modules...');
        await this.ioc.bindModules();
        this.log.info('Setting up IoC...');
        this.inversifyExpressServer = this.bootstrapApp.setupInversifyExpressServer(this.express, this.ioc);
        this.express = this.bootstrapApp.bindInversifyExpressServer(this.express, this.inversifyExpressServer);
        this.bootstrapApp.setupCoreTools(this.express);
        this.log.info('Starting app...');
        this.server = new Server(this.bootstrapApp.startServer(this.express));
        this.server.use(this.express);
        this.log.info('App is ready!');
    }

}
