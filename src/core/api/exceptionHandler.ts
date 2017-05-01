import * as express from 'express';

import * as core from '../index';


export const exceptionHandler = (error: core.Exception, req: express.Request, res: express.Response, next: express.NextFunction) => {

    // check if the return value is an exception
    if (error instanceof core.Exception) {
        res.status(error.code)
            .send(error.message);
    } else {
        next(error);
    }

};
