import * as express from 'express';

import * as core from '../../core';


export class Hook implements core.Hookable {

    public before(req: express.Request, res: express.Response): Promise<void> {
        return Promise.resolve();
    }

    public after<T>(req: express.Request, res: express.Response, result: T): Promise<T> {
        return Promise.resolve(result);
    }

}
