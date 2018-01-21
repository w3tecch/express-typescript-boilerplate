import { JsonController, Get, Post, Put, Param, Delete, Body, OnUndefined, Authorized, CurrentUser } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { UserService } from '../services/UserService';
import { UserNotFoundError } from '../errors/UserNotFoundError';
import { User } from '../models/User';
import { UserDto as ReqUserDto } from './requests/UserDto';
import { UserDto as ResUserDto } from './responses/UserDto';


@Authorized()
@JsonController('/users')
export class UserController {

    constructor(
        private userService: UserService
    ) { }

    @Get()
    @OpenAPI({
        description: 'Find all users',
    })
    public async find(): Promise<ResUserDto[]> {
        const entities = await this.userService.find();
        const dtos = entities.map((entity) => ResUserDto.fromEntity(entity) as Promise<ResUserDto>);
        return Promise.all(dtos);
    }

    @Get('/self')
    @OpenAPI({
        description: 'Find current user',
    })
    public async self( @CurrentUser() user?: User): Promise<ResUserDto | undefined> {
        return ResUserDto.fromEntity(user);
    }

    @Get('/:id')
    @OnUndefined(UserNotFoundError)
    @OpenAPI({
        description: 'Find one user',
        parameters: [{
            name: 'id',
            in: 'path',
            description: 'Pet id to find',
        }],
    })
    public async one( @Param('id') id: string): Promise<ResUserDto | undefined> {
        const entity = await this.userService.findOne(id);
        return ResUserDto.fromEntity(entity);
    }

    @Post()
    @OpenAPI({
        description: 'Create one user',
    })
    public async create( @Body() dto: ReqUserDto): Promise<ResUserDto | undefined> {
        const entity = await this.userService.create(await dto.toEntity());
        return ResUserDto.fromEntity(entity);
    }

    @Put('/:id')
    @OpenAPI({
        description: 'Update one user',
        parameters: [{
            name: 'id',
            in: 'path',
            description: 'User id to update',
        }],
    })
    public async update( @Param('id') id: string, @Body() dto: ReqUserDto): Promise<ResUserDto | undefined> {
        const entity = await this.userService.update(id, await dto.toEntity());
        return ResUserDto.fromEntity(entity);
    }

    @Delete('/:id')
    @OpenAPI({
        description: 'Delete one user',
        parameters: [{
            name: 'id',
            in: 'path',
            description: 'User id to update',
        }],
    })
    public async delete( @Param('id') id: string): Promise<void> {
        return this.userService.delete(id);
    }
}
