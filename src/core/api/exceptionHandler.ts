import { my } from 'my-express';
import { Exception, isException } from '../api/Exception';


/**
 * Exception Handler
 * ---------------------------
 * This handler catches all thrown exceptions from the api. Afterwards it
 * send them to the client otherwise it moves to the next middleware or handler.
 */
export const exceptionHandler = (error: Exception | Error, req: my.Request, res: my.Response, next: my.NextFunction) => {
    if (error instanceof Exception || error[isException]) {
        res.failed(error['code'], error.message, error['body'] || null);
        next();
    } else {
        console.error(error.stack);
        res.failed(500, 'Something broke!', error['body'] || null);
        next(error);
    }
};
