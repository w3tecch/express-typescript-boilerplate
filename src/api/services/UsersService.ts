import { injectable, inject, named } from 'inversify';
import * as Bookshelf from 'bookshelf';
import * as core from '../../core';
import * as models from '../models';
import * as repo from '../repositories';
import { NotFoundException } from '../exceptions';
import TYPES from '../../constants/types';
import TAGS from '../../constants/tags';
import { UserCreateRequest } from '../request/UserCreateRequest';
import { UserUpdateRequest } from '../request/UserUpdateRequest';

const log = new core.Log('api:services:UserService');

/**
 * UserService
 *
 * @export
 * @class UserService
 */
@injectable()
export class UserService {

    constructor(
        @inject(TYPES.UserRepository) @named(TAGS.UserRepository) public userRepo: typeof repo.UserRepository
    ) {
    }

    public async findAll(): Promise<Bookshelf.Collection<models.User>> {
        return this.userRepo.findAll();
    }

    public async findOne(id: number): Promise<models.User> {
        let user = await this.userRepo.findOne(id);
        if (user === null) {
            log.warn(`User with the id=${id} was not found!`);
            throw new NotFoundException(id);
        }
        return user;
    }

    public async create(data: any): Promise<models.User> {
        // Validate request payload
        const request = new UserCreateRequest(data);
        await request.validate();

        // If the request body was valid we will create the user
        let user = await this.userRepo.create(data);
        return user;
    }

    public async update(id: number, newUser: any): Promise<models.User> {
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
