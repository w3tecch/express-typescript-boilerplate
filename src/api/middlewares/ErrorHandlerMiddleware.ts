import * as express from 'express';
import { Middleware, ExpressErrorMiddlewareInterface, HttpError } from 'routing-controllers';
import { env } from '../../core/env';
import { Log } from '../../core/Log';
const log = new Log(__filename);


@Middleware({ type: 'after' })
export class CustomErrorHandler implements ExpressErrorMiddlewareInterface {

    public error(error: HttpError, req: express.Request, res: express.Response, next: express.NextFunction): void {

        // Standard output of an error to the user.
        res.status(error.httpCode || 500);
        res.json({
            name: error.name,
            message: error.message
        });

        // Print stack if the status code matches or is higher than the defined one in the .env file.
        if (error.httpCode >= (env.app.error.printStackCode || 404)) {
            log.error(error.stack as string);
        }
    }

}
