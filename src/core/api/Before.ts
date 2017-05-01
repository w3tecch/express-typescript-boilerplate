import * as express from 'express';

import * as core from '../index';


const log = new core.Log('core:Before');

export function Before(hooks: core.Hookable[]): any {
    return function (target: Function, key: string, descriptor: PropertyDescriptor): PropertyDescriptor {
        return {
            value: async function (req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> {

                // run before hooks
                log.debug(`Run all before hooks for ${key}`);
                for (let i = 0; i < hooks.length; i++) {
                    if (hooks[i].before) {
                        await hooks[i].before(req, res);
                    }
                }

                // run the main controller method function
                log.debug(`Run controller function ${key}`);
                const fun = descriptor.value.bind(this);
                let body = await fun(req, res, next);

                // return the body and not any express objects
                return body;

            }
        };
    };
}
