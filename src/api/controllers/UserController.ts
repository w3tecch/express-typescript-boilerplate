import * as express from 'express';
import { injectable, inject } from 'inversify';
import { Controller, Get, Response, Next, RequestParam } from 'inversify-express-utils';
import TYPES from '../../constants/types';
import * as core from '../../core';
import { UserService } from '../services';

import { Before, After, ContentType } from '../../core/api';
import { removeFirstName } from '../hooks';
import { json } from '../converters';

const log = new core.Log('api:ctrl.UserController');

/**
 * UserController
 *
 * @export
 * @class UserController
 */
@injectable()
@Controller('/users')
export class UserController {

    constructor( @inject(TYPES.UserService) private userService: UserService) { }

    @Get('/')
    @ContentType(json)
    public async findAll(
        @Response() res: express.Response,
        @Next() next: express.NextFunction): Promise<any> {
        log.debug('findAll');
        const users = await this.userService.findAll();
        return users;
    }

    @Get('/:id')
    @ContentType(json)
    @Before([removeFirstName])
    @After([removeFirstName])
    public async findOne(
        @RequestParam('id') id: string,
        @Response() res: express.Response,
        @Next() next: express.NextFunction): Promise<any> {
        log.debug('findOne ', id);
        const user = await this.userService.findOne(parseInt(id, 10));
        return user.toJSON();
    }

}
