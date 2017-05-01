import * as express from 'express';

import * as core from '../index';

const log = new core.Log('core:ExceptionHandling');


export function ExceptionHandling(): any {
    return function (target: Function, key: string, descriptor: PropertyDescriptor): PropertyDescriptor {
        return {
            value: async function (req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> {
                const fun = descriptor.value.bind(this);
                try {
                    let body = await fun(req, res, next);
                    return body;
                } catch (error) {
                    log.debug('main controller function failed with an exception');
                    next(error);
                    return error;
                }
            }
        };
    };
}
