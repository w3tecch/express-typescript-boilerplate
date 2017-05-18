import * as Bookshelf from 'bookshelf';
import { injectable, inject, named } from 'inversify';
import { Repository } from '../../constants/Targets';
import { Types } from '../../constants/Types';
import { Log } from '../../core/log';
import { NotFoundException } from '../exceptions';
import { UserCreateRequest } from '../request/UserCreateRequest';
import { UserUpdateRequest } from '../request/UserUpdateRequest';
import { UserRepository } from '../repositories';
import { User } from '../models';

const log = new Log('api:services:UserService');

/**
 * UserService
 *
 * @export
 * @class UserService
 */
@injectable()
export class UserService {

    constructor(
        @inject(Types.UserRepository) @named(Repository.UserRepository) public userRepo: typeof UserRepository
    ) {
    }

    public async findAll(): Promise<Bookshelf.Collection<User>> {
        return this.userRepo.findAll();
    }

    public async findOne(id: number): Promise<User> {
        let user = await this.userRepo.findOne(id);
        if (user === null) {
            log.warn(`User with the id=${id} was not found!`);
            throw new NotFoundException(id);
        }
        return user;
    }

    public async create(data: any): Promise<User> {
        // Validate request payload
        const request = new UserCreateRequest(data);
        await request.validate();

        // If the request body was valid we will create the user
        let user = await this.userRepo.create(data);
        return user;
    }

    public async update(id: number, newUser: any): Promise<User> {
        const oldUserModel = await this.findOne(id);
        let oldUser = oldUserModel.toJSON();
        const request = new UserUpdateRequest(oldUser);

        request.setFirstName(newUser.firstName);
        request.setLastName(newUser.lastName);
        request.setEmail(newUser.email);

        // Validate request payload
        await request.validate();

        // If the request body was valid we will create the user
        let user = await this.userRepo.update(id, request.toJSON());
        return user;
    }

    public async destroy(id: number): Promise<void> {
        await this.userRepo.destroy(id);
    }

}
