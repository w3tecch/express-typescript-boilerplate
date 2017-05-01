import * as express from 'express';

import * as core from '../../core';

const log = new core.Log('api:converters:JsonConverter');


class JsonConverter implements core.Convertable {

    public async convert<T>(body: T, res: express.Response): Promise<void> {
        log.debug('Converting body to json response');
        res.json(body);
        return;
    }

}

export const json = new JsonConverter();
