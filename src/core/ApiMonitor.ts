import * as express from 'express';
import * as monitor from 'express-status-monitor';
import { Environment } from './helpers/Environment';
import { BasicAuthentication } from './BasicAuthentication';


export class ApiMonitor {

    public static getRoute(): string {
        return process.env.MONITOR_ROUTE as string;
    }

    public setup(app: express.Application): void {
        if (Environment.isTruthy(process.env.MONITOR_ENABLED as string)) {
            app.use(monitor());
            app.get(ApiMonitor.getRoute(), BasicAuthentication(), monitor().pageRoute);
        }
    }
}
