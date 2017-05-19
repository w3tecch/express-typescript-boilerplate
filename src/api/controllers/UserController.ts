import { injectable, inject } from 'inversify';
import { Controller, Get, Post, Put, Delete, RequestParam, RequestBody, Response } from 'inversify-express-utils';
import { my } from 'my-express';
import { Log } from '../../core/log';
import { UserService } from '../services/UsersService';
import { Types } from '../../constants/Types';
import { authenticate } from '../middlewares/authenticate';

const log = new Log('api:ctrl.UserController');

/**
 * UserController is in charge of the user resource and should
 * provide all crud actions.
 *
 * @export
 * @class UserController
 */
@injectable()
@Controller('/v1/user')
export class UserController {

    constructor( @inject(Types.UserService) private userService: UserService) { }

    @Get('/', authenticate)
    public async findAll( @Response() res: my.Response): Promise<any> {
        log.debug('findAll');
        const users = await this.userService.findAll();
        return res.found(users.toJSON());
    }

    @Get('/:id')
    public async findOne( @Response() res: my.Response, @RequestParam('id') id: string): Promise<any> {
        log.debug('findOne ', id);
        const user = await this.userService.findOne(parseInt(id, 10));
        return res.found(user.toJSON());
    }

    @Post('/')
    public async create( @Response() res: my.Response, @RequestBody() body: any): Promise<any> {
        log.debug('create ', body);
        const user = await this.userService.create(body);
        return res.created(user.toJSON());
    }

    @Put('/:id')
    public async update( @Response() res: my.Response, @RequestParam('id') id: string, @RequestBody() body: any): Promise<any> {
        log.debug('update ', body);
        const user = await this.userService.update(parseInt(id, 10), body);
        return res.updated(user.toJSON());
    }

    @Delete('/:id')
    public async destroy( @Response() res: my.Response, @RequestParam('id') id: string): Promise<any> {
        log.debug('destroy ', id);
        await this.userService.destroy(parseInt(id, 10));
        return res.destroyed();
    }

}
