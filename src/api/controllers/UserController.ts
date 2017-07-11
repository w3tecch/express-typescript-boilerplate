/**
 * UserController
 * ----------------------------------------
 *
 * This controller is in charge of the user resource and should
 * provide all crud actions.
 */

import { inject, named } from 'inversify';
import { controller, httpGet, httpPost, httpPut, httpDelete, response, request, requestBody, requestParam } from 'inversify-express-utils';
import { app } from '../../app';
import { Types, Targets } from '../../constants';
import { UserService } from '../services/UserService';

// Get middlewares
const populateUser = app.IoC.getNamed<interfaces.Middleware>(Types.Middleware, Targets.Middleware.PopulateUserMiddleware);
const authenticate = app.IoC.getNamed<interfaces.Middleware>(Types.Middleware, Targets.Middleware.AuthenticateMiddleware);


@controller('/users', authenticate.use)
export class UserController {

    constructor( @inject(Types.Service) @named(Targets.Service.UserService) private userService: UserService) { }

    @httpGet('/')
    public async findAll( @response() res: myExpress.Response): Promise<any> {
        const users = await this.userService.findAll();
        return res.found(users.toJSON());
    }

    @httpPost('/')
    public async create( @response() res: myExpress.Response, @requestBody() body: any): Promise<any> {
        const user = await this.userService.create(body);
        return res.created(user.toJSON());
    }

    @httpGet('/me', populateUser.use)
    public async findMe( @request() req: myExpress.Request, @response() res: myExpress.Response): Promise<any> {
        return res.found(req.user);
    }

    @httpGet('/:id')
    public async findOne( @response() res: myExpress.Response, @requestParam('id') id: string): Promise<any> {
        const user = await this.userService.findOne(parseInt(id, 10));
        return res.found(user.toJSON());
    }

    @httpPut('/:id')
    public async update( @response() res: myExpress.Response, @requestParam('id') id: string, @requestBody() body: any): Promise<any> {
        const user = await this.userService.update(parseInt(id, 10), body);
        return res.updated(user.toJSON());
    }

    @httpDelete('/:id')
    public async destroy( @response() res: myExpress.Response, @requestParam('id') id: string): Promise<any> {
        await this.userService.destroy(parseInt(id, 10));
        return res.destroyed();
    }

}
