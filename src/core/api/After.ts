import * as express from 'express';

import { Hookable } from './interfaces/Hookable';
import { Log } from '../log';
import { Exception } from '../api';


const log = new Log('core:After');

export function After(hooks: Hookable[]): any {
    return function (target: Function, key: string, descriptor: PropertyDescriptor): PropertyDescriptor {
        return {
            value: async function (req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> {

                // run the main controller method function
                log.debug(`Run controller function ${key}`);
                const fun = descriptor.value.bind(this);
                let body = await fun(req, res, next);

                // check if the return value is an exception
                if (body instanceof Exception) {
                    return body;
                }

                // try to run the after hooks
                try {
                    log.debug(`Run all after hooks for ${key}`);
                    for (let i = 0; i < hooks.length; i++) {
                        if (hooks[i].before) {
                            body = await hooks[i].after(req, res, body);
                        }
                    }
                } catch (e) {
                    log.error('After hooks failed', e);
                }

                return body;
            }
        };
    };
}
