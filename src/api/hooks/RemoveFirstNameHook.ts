import * as express from 'express';

import * as core from '../../core';

const log = new core.Log('api:hooks:RemoveFirstNameHook');


interface FirstNameObject {
    firstName: string;
}

class RemoveFirstNameHook extends core.Hook {

    public before(req: express.Request, res: express.Response): Promise<void> {
        log.debug(`before`);
        return Promise.resolve();
    }

    public after(req: express.Request, res: express.Response, body: FirstNameObject[] | FirstNameObject): Promise<FirstNameObject[]> {
        log.debug(`after`);
        if (Array.isArray(body)) {
            body = body.map((r) => {
                delete r.firstName;
                return r;
            });
        } else {
            delete body.firstName;
        }
        return Promise.resolve(body);
    }

}

export const removeFirstName = new RemoveFirstNameHook();
