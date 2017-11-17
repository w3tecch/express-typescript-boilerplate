/**
 * config.Custom
 * ------------------------------------
 *
 * Define all log adapters for this application and chose one.
 */

import * as express from 'express';
import * as uuid from 'uuid';

import { Logger } from '../core/Logger';
import { App, Configurable } from '../core/App';
import { Environment } from '../core/helpers/Environment';


export class CustomHeaderConfig implements Configurable {

    private log = new Logger(__filename);

    public configure(app: App): void {
        this.log.debug('Add custom headers');

        app.Express.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
            res.setHeader('X-API-VERSION', Environment.getPkg().version);
            res.setHeader('X-Request-Id', uuid.v4());
            next();
        });

    }
}

