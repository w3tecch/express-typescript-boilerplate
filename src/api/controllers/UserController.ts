import { JsonController, Get, Post as HttpPost, Param, Delete, Body } from 'routing-controllers';
import { Service } from 'typedi';
import { UserRepository } from '../repositories/UserRepository';
import { User } from '../models/User';

@Service()
@JsonController()
export class UserController {

    constructor(private userRepository: UserRepository) {
    }

    @Get('/users')
    public all(): Promise<User[]> {
        return this.userRepository.findAll();
    }

    @Get('/users/:id')
    public one( @Param('id') id: number): User | undefined {
        return this.userRepository.findOne(id);
    }

    @HttpPost('/users')
    public post( @Body() user: User): User {
        return this.userRepository.save(user);
    }

    @Delete('/users/:id')
    public delete( @Param('id') id: number): User | undefined {
        return this.userRepository.remove(id);
    }

}
