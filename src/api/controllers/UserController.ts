import { JsonController, Get, Post, Param, Delete, Body } from 'routing-controllers';
import { Service } from 'typedi';
import { UserRepository } from '../repositories/UserRepository';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { User } from '../models/User';


@Service()
@JsonController()
export class UserController {

    @OrmRepository()
    private userRepository: UserRepository;

    @Get('/users')
    public async all(): Promise<User[]> {
        return await this.userRepository.find();
    }

    @Get('/users/:id')
    public async one( @Param('id') id: string): Promise<User | undefined> {
        return await this.userRepository.findOne({ id });
    }

    @Post('/users')
    public async post( @Body() user: User): Promise<User> {
        return await this.userRepository.save(user);
    }

    @Delete('/users/:id')
    public async delete( @Param('id') id: string): Promise<void> {
        return await this.userRepository.removeById(id);
    }

}
