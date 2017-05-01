import * as express from 'express';

import * as core from '../index';

const log = new core.Log('core:ContentType');


export function ContentType(converter: core.Convertable): any {
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
