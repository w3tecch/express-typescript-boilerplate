import { JsonController, Get, Post, Put, Param, Delete, Body, OnUndefined } from 'routing-controllers';
import { Inject } from 'typedi';
import { UserService } from '../services/UserService';
import { User } from '../models/User';
import { UserNotFoundError } from '../errors/UserNotFoundError';


@JsonController('/users')
export class UserController {

    @Inject()
    private userService: UserService;

    @Get()
    public find(): Promise<User[]> {
        return this.userService.find();
    }

    @Get('/:id')
    @OnUndefined(UserNotFoundError)
    public one( @Param('id') id: string): Promise<User | undefined> {
        return this.userService.findOne(id);
    }

    @Post()
    public create( @Body() user: User): Promise<User> {
        return this.userService.create(user);
    }

    @Put('/:id')
    public update( @Param('id') id: string, @Body() user: User): Promise<User> {
        return this.userService.update(id, user);
    }

    @Delete('/:id')
    public delete( @Param('id') id: string): Promise<void> {
        return this.userService.delete(id);
    }

}
