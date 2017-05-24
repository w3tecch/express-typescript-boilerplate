import { injectable, inject } from 'inversify';
import { Controller, Get, Post, Put, Delete, RequestParam, RequestBody, Response, Request } from 'inversify-express-utils';
import { my } from 'my-express';
import { Log } from '../../core/log';
import { UserService } from '../services/UsersService';
import { Types } from '../../constants/Types';
import { authenticate, populateUser } from '../middlewares';

const log = new Log('api:ctrl.UserController');

/**
 * UserController is in charge of the user resource and should
 * provide all crud actions.
 */
@injectable()
@Controller('/v1/user', authenticate)
export class UserController {

    constructor( @inject(Types.UserService) private userService: UserService) { }

    /**
     * @swagger
     * /user:
     *   get:
     *     tags:
     *     - User
     *     summary: List all users
     *     description: Returns users
     *     security:
     *     - JWT: []
     *     responses:
     *       200:
     *         description: List of all users
     *         schema:
     *           type: object
     *           title: UserResponse
     *           properties:
     *             success:
     *               type: boolean
     *             message:
     *               type: string
     *             data:
     *               type: array
     *               items:
     *                 $ref: "#/definitions/User"
     */
    @Get('/')
    public async findAll( @Response() res: my.Response): Promise<any> {
        log.debug('findAll');
        const users = await this.userService.findAll();
        return res.found(users.toJSON());
    }

    /**
     * @swagger
     * /user:
     *   post:
     *     tags:
     *     - User
     *     summary: Create new user
     *     description: Creates new user and returns him
     *     security:
     *     - JWT: []
     *     parameters:
     *     - in: "body"
     *       name: "body"
     *       required: true
     *       schema:
     *         $ref: "#/definitions/NewUser"
     *     responses:
     *       200:
     *         description: New user
     *         schema:
     *           type: object
     *           title: UserResponse
     *           properties:
     *             success:
     *               type: boolean
     *             message:
     *               type: string
     *             data:
     *               $ref: "#/definitions/User"
     */
    @Post('/')
    public async create( @Response() res: my.Response, @RequestBody() body: any): Promise<any> {
        log.debug('create ', body);
        const user = await this.userService.create(body);
        return res.created(user.toJSON());
    }

    /**
     * @swagger
     * /user/me:
     *   get:
     *     tags:
     *     - User
     *     summary: Get logged in user
     *     description: Returns logged in user
     *     security:
     *     - JWT: []
     *     responses:
     *       200:
     *         description: User
     *         schema:
     *           type: object
     *           title: UserResponse
     *           properties:
     *             success:
     *               type: boolean
     *             message:
     *               type: string
     *             data:
     *               type: object
     *               $ref: "#/definitions/User"
     */
    @Get('/me', populateUser)
    public async findMe( @Request() req: my.Request, @Response() res: my.Response): Promise<any> {
        log.debug('findMe');
        return res.found(req.user);
    }

    /**
     * @swagger
     * /user/{id}:
     *   get:
     *     tags:
     *     - User
     *     summary: Get user
     *     description: Returns a user
     *     security:
     *     - JWT: []
     *     responses:
     *       200:
     *         description: User
     *         schema:
     *           type: object
     *           title: UserResponse
     *           properties:
     *             success:
     *               type: boolean
     *             message:
     *               type: string
     *             data:
     *               type: object
     *               $ref: "#/definitions/User"
     */
    @Get('/:id')
    public async findOne( @Response() res: my.Response, @RequestParam('id') id: string): Promise<any> {
        log.debug('findOne ', id);
        const user = await this.userService.findOne(parseInt(id, 10));
        return res.found(user.toJSON());
    }

    /**
     * @swagger
     * /user/{id}:
     *   put:
     *     tags:
     *     - User
     *     summary: Update user
     *     description: Returns a user
     *     security:
     *     - JWT: []
     *     parameters:
     *     - name: "id"
     *       in: "path"
     *       description: "ID of user to return"
     *       required: true
     *       type: "integer"
     *       format: "int64"
     *     - in: "body"
     *       name: "body"
     *       description: "User object"
     *       required: true
     *       schema:
     *         $ref: "#/definitions/NewUser"
     *     responses:
     *       200:
     *         description: User
     *         schema:
     *           type: object
     *           title: UserResponse
     *           properties:
     *             success:
     *               type: boolean
     *             message:
     *               type: string
     *             data:
     *               type: object
     *               $ref: "#/definitions/User"
     */
    @Put('/:id')
    public async update( @Response() res: my.Response, @RequestParam('id') id: string, @RequestBody() body: any): Promise<any> {
        log.debug('update ', body);
        const user = await this.userService.update(parseInt(id, 10), body);
        return res.updated(user.toJSON());
    }

    /**
     * @swagger
     * /user/{id}:
     *   delete:
     *     tags:
     *     - User
     *     summary: Delete user
     *     description: Returns a user
     *     security:
     *     - JWT: []
     *     parameters:
     *     - name: "id"
     *       in: "path"
     *       description: "ID of user to return"
     *       required: true
     *       type: "integer"
     *       format: "int64"
     *     responses:
     *       200:
     *         description: User
     *         schema:
     *           type: object
     *           title: UserResponse
     *           properties:
     *             success:
     *               type: boolean
     *             message:
     *               type: string
     *             data:
     *               type: object
     *               example:
     */
    @Delete('/:id')
    public async destroy( @Response() res: my.Response, @RequestParam('id') id: string): Promise<any> {
        log.debug('destroy ', id);
        await this.userService.destroy(parseInt(id, 10));
        return res.destroyed();
    }

}
