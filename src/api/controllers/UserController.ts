import { injectable, inject } from 'inversify';
import { Controller, Get, RequestParam } from 'inversify-express-utils';
import TYPES from '../../constants/types';
import * as core from '../../core';
import { UserService } from '../services';

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
    public async findAll(): Promise<any> {
        log.debug('findAll');
        const users = await this.userService.findAll();
        return users.toJSON();
    }

    @Get('/:id')
    public async findOne( @RequestParam('id') id: string): Promise<any> {
        log.debug('findOne ', id);
        const user = await this.userService.findOne(parseInt(id, 10));
        return user.toJSON();
    }

}
