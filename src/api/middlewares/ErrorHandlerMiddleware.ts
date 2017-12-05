import * as express from 'express';
import { Middleware, ExpressErrorMiddlewareInterface, HttpError } from 'routing-controllers';
import { env } from '../../core/env';
import { Logger, LoggerInterface } from '../../decorators/Logger';


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
            errors: error['errors'] || [],
        });

        if (this.isProduction) {
            this.log.error(error.name, error.message);
        } else {
            this.log.error(error.name, error.stack);
        }

    }

}
