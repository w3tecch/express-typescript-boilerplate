import * as express from 'express';
import * as monitor from 'express-status-monitor';
import { my } from 'my-express';
import { Environment } from './Environment';


export class ApiMonitor {

    constructor(public app: express.Application) { }

    public setup(): void {
        if (Environment.get<string>('MONITOR_ENABLED') === 'true') {
            this.app.use(monitor());
            this.app.get(Environment.get<string>('APP_URL_PREFIX') + Environment.get<string>('MONITOR_ROUTE'), monitor().pageRoute);
        }
    }

}
