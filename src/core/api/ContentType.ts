import * as express from 'express';

import { Convertable } from './interfaces/Convertable';
import { Log } from '../log';


const log = new Log('core:ContentType');


export function ContentType(converter: Convertable): any {
    return function (target: Function, key: string, descriptor: PropertyDescriptor): PropertyDescriptor {
        return {
            value: async function (req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> {
                const fun = descriptor.value.bind(this);
                let body = await fun(req, res, next);
                if (!body['code']) {
                    log.debug(`Set content-type to json for ${key}`);
                    return await converter.convert(body, res);
                }
                return body;
            }
        };
    };
}
