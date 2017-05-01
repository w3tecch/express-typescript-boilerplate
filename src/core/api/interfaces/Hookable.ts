import * as express from 'express';


export interface Beforeable {
    before(req: express.Request, res: express.Response): Promise<void>;
}

export interface Afterable {
    after<T, R>(req: express.Request, res: express.Response, result: R): Promise<T>;
}

export interface Hookable extends Beforeable, Afterable {
}
