import * as express from 'express';
import * as core from '../index';


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
export const exceptionHandler = (error: core.Exception | Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (error instanceof core.Exception) {
        res.status(error.code).json({
            message: error.message
        });
        next();
    } else {
        console.error(error.stack);
        res.status(500).json({
            message: 'Something broke!'
        });
        next(error);
    }
};
