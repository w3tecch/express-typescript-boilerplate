import * as express from 'express';
import { Middleware, ExpressErrorMiddlewareInterface, HttpError } from 'routing-controllers';
import { env } from '../../core/env';
import { Logger } from '../../core/Logger';
const log = new Logger(__filename);


@Middleware({ type: 'after' })
export class CustomErrorHandler implements ExpressErrorMiddlewareInterface {

    public error(error: HttpError, req: express.Request, res: express.Response, next: express.NextFunction): void {
        res.status(error.httpCode || 500);

        // Standard output of an error to the user.
        if (env.isProduction) {
            res.json({
                name: error.name,
                message: error.message,
                stack: error.stack,
            });
            log.error(error.name, error.stack);
        } else {
            res.json({
                name: error.name,
                message: error.message,
            });
            log.error(error.name, error.message);
        }

    }

}
