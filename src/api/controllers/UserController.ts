/**
 * UserController
 * ----------------------------------------
 *
 * This controller is in charge of the user resource and should
 * provide all crud actions.
 */

import { inject, named } from 'inversify';
import { Controller, Get, Post, Put, Delete, RequestParam, RequestBody, Response, Request } from 'inversify-express-utils';
import { myExpress } from 'my-express';
import { UserService } from '../services/UserService';
import { Types } from '../../constants/Types';
import { Service, Middleware } from '../../constants/Targets';
import { PopulateUserMiddleware } from '../middlewares/PopulateUserMiddleware';
import { AuthenticateMiddleware } from '../middlewares/AuthenticateMiddleware';
import { app } from '../../core';

// Get middlewares
const populateUser = app.IoC.getNamed<PopulateUserMiddleware>(Types.Middleware, Middleware.PopulateUserMiddleware);
const authenticate = app.IoC.getNamed<AuthenticateMiddleware>(Types.Middleware, Middleware.AuthenticateMiddleware);


@Controller('/users', authenticate.use)
export class UserController {

    constructor( @inject(Types.Service) @named(Service.UserService) private userService: UserService) { }

    @Get('/')
    public async findAll( @Response() res: myExpress.Response): Promise<any> {
        const users = await this.userService.findAll();
        return res.found(users.toJSON());
    }

    @Post('/')
    public async create( @Response() res: myExpress.Response, @RequestBody() body: any): Promise<any> {
        const user = await this.userService.create(body);
        return res.created(user.toJSON());
    }

    @Get('/me', populateUser.use)
    public async findMe( @Request() req: myExpress.Request, @Response() res: myExpress.Response): Promise<any> {
        return res.found(req.user);
    }

    @Get('/:id')
    public async findOne( @Response() res: myExpress.Response, @RequestParam('id') id: string): Promise<any> {
        const user = await this.userService.findOne(parseInt(id, 10));
        return res.found(user.toJSON());
    }

    @Put('/:id')
    public async update( @Response() res: myExpress.Response, @RequestParam('id') id: string, @RequestBody() body: any): Promise<any> {
        const user = await this.userService.update(parseInt(id, 10), body);
        return res.updated(user.toJSON());
    }

    @Delete('/:id')
    public async destroy( @Response() res: myExpress.Response, @RequestParam('id') id: string): Promise<any> {
        await this.userService.destroy(parseInt(id, 10));
        return res.destroyed();
    }

}
