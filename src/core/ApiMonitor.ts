import * as path from 'path';
import * as express from 'express';
import * as monitor from 'express-status-monitor';
import { Environment } from './helpers/Environment';


export class ApiMonitor {
    public setup(app: express.Application): void {
        if (Environment.isTruthy(process.env.MONITOR_ENABLED)) {
            app.use(monitor());
            app.get(path.join(process.env.APP_URL_PREFIX, process.env.MONITOR_ROUTE), monitor().pageRoute);
        }
    }
}
