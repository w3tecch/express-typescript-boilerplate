import {
    Authorized, Body, Delete, Get, JsonController, OnUndefined, Param, Post, Put, Req
} from 'routing-controllers';

import { UserNotFoundError } from '../errors/UserNotFoundError';
import { User } from '../models/User';
import { UserService } from '../services/UserService';

@Authorized()
@JsonController('/users')
export class UserController {

    constructor(
        private userService: UserService
    ) { }

    @Get()
    public find(): Promise<User[]> {
        return this.userService.find();
    }

    @Get('/me')
    public findMe(@Req() req: any): Promise<User[]> {
        return req.user;
    }

    @Get('/:id')
    @OnUndefined(UserNotFoundError)
    public one(@Param('id') id: string): Promise<User | undefined> {
        return this.userService.findOne(id);
    }

    @Post()
    public create(@Body() user: User): Promise<User> {
        return this.userService.create(user);
    }

    @Put('/:id')
    public update(@Param('id') id: string, @Body() user: User): Promise<User> {
        return this.userService.update(id, user);
    }

    @Delete('/:id')
    public delete(@Param('id') id: string): Promise<void> {
        return this.userService.delete(id);
    }

}
