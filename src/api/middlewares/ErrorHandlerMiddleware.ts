import * as express from 'express';
import { ExpressErrorMiddlewareInterface, HttpError, Middleware } from 'routing-controllers';

import { Logger, LoggerInterface } from '../../decorators/Logger';
import { env } from '../../env';

@Middleware({ type: 'after' })
export class ErrorHandlerMiddleware implements ExpressErrorMiddlewareInterface {

    public isProduction = env.isProduction;

    constructor(
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public error(error: HttpError, req: express.Request, res: express.Response, next: express.NextFunction): void {
        res.status(error.httpCode || 500);
        res.json({
            name: error.name,
            message: error.message,
            errors: error[`errors`] || [],
        });

        if (this.isProduction) {
            this.log.error(error.name, error.message);
        } else {
            this.log.error(error.name, error.stack);
        }

    }

}
