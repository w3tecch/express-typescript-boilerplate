import * as express from 'express';

import * as service from '../services';
import * as core from '../../core';
import { removeFirstName } from '../hooks';
import { json } from '../converters';
import { ContentType, ExceptionHandling, Before, After } from '../../core';

const log = new core.Log('api:ctrl.UsersController');


export class UsersController {

    constructor(private userService: service.UserService) {
        log.debug('constructed');
    }

    @ContentType(json)
    @After([removeFirstName])
    @ExceptionHandling()
    public async findAll(req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> {
        log.debug('findAll');
        const result = await this.userService.findAll();
        return result.toJSON();
    }

    @ContentType(json)
    @After([removeFirstName])
    @ExceptionHandling()
    @Before([removeFirstName])
    public async findOne(req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> {
        log.debug('findOne');
        const result = await this.userService.findOne(parseInt(req.params.id, 10));
        return result.toJSON();
    }


}






