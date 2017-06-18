/**
 * core.api.exceptionHandler
 * ------------------------------------------------
 *
 * This handler catches all thrown exceptions from the api layer. Afterwards it
 * send them directly to the client or otherwise it calls the next middleware.
 */

import { myExpress } from 'my-express';
import { Environment } from '../Environment';
import { Exception, isException } from '../api/Exception';


export const exceptionHandler = (error: Exception | Error, req: myExpress.Request, res: myExpress.Response, next: myExpress.NextFunction) => {
    if (error instanceof Exception || error[isException]) {
        res.failed(error['code'], error.message, error['body'] || null);
        next();
    } else {
        if (Environment.isDevelopment()) {
            console.error(error.stack);
        }
        res.failed(500, 'Something broke!', error['body'] || null);
        next(error);
    }
};
