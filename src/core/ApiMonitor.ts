import * as express from 'express';
import * as monitor from 'express-status-monitor';
import * as path from 'path';
import { Environment } from './helpers/Environment';


export class ApiMonitor {

    public static getRoute(): string {
        return path.join(process.env.MONITOR_ROUTE);
    }

    public setup(app: express.Application): void {
        if (Environment.isTruthy(process.env.MONITOR_ENABLED)) {
            app.use(monitor());
            app.get(ApiMonitor.getRoute(), monitor().pageRoute);
        }
    }
}
