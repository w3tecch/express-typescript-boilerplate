import { my } from 'my-express';
import { Exception, isException } from '../api/Exception';


/**
 * @name exceptionHandler
 * @description
 * This handler catches all thrown exceptions from the api. Afterwards it
 * send them to the client otherwise it moves to the next middleware or handler.
 *
 * @param {core.Exception} error
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
export const exceptionHandler = (error: Exception | Error, req: my.Request, res: my.Response, next: my.NextFunction) => {
    console.log('exceptionHandler', error.message, error['body']);
    if (error instanceof Exception || error[isException]) {
        res.failed(error['code'], error.message, error['body'] || null);
        next();
    } else {
        console.error(error.stack);
        res.failed(500, 'Something broke!', error['body'] || null);
        next(error);
    }
};
