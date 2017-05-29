import * as Bookshelf from 'bookshelf';
import { injectable, inject, named } from 'inversify';
import { Repository } from '../../constants/Targets';
import { Types } from '../../constants/Types';
import { Log } from '../../core/log';
import { NotFoundException } from '../exceptions/NotFoundException';
import { UserCreateRequest } from '../requests/UserCreateRequest';
import { UserUpdateRequest } from '../requests/UserUpdateRequest';
import { UserRepository } from '../repositories/UserRepository';
import { User } from '../models/User';

const log = new Log('api:services:UserService');

/**
 * UserService
 * ------------------------------
 * This service is here to validate and call the repository layer for
 * database actions. Furthermore you should throw events here if
 * necessary.
 *
 * @export0'
 * @class UserService
 */
@injectable()
export class UserService {

    constructor(
        @inject(Types.UserRepository) @named(Repository.UserRepository) public userRepo: typeof UserRepository
    ) { }

    /**
     * This returns all user database objects
     */
    public async findAll(): Promise<Bookshelf.Collection<User>> {
        return this.userRepo.findAll();
    }

    /**
     * Returns the user with the given id or throws a Not-Found exception
     *
     * @param {number} id of the user
     * @returns {Promise<User>}
     */
    public async findOne(id: number): Promise<User> {
        const user = await this.userRepo.findOne(id);
        if (user === null) {
            log.warn(`User with the id=${id} was not found!`);
            throw new NotFoundException(id);
        }
        return user;
    }

    /**
     * Returns the user with the given user_id or throws a Not-Found exception
     *
     * @param {number} id of the user
     * @returns {Promise<User>}
     */
    public async findByUserId(userId: string): Promise<User> {
        const user = await this.userRepo.findByUserId(userId);
        if (user === null) {
            log.warn(`User with the userId=${userId} was not found!`);
            throw new NotFoundException(userId);
        }
        return user;
    }

    /**
     * We will validate the data and create a new user and
     * return it, so the client get its new id
     *
     * @param {*} data is the json body of the request
     * @returns {Promise<User>}
     */
    public async create(data: any): Promise<User> {
        // Validate request payload
        const request = new UserCreateRequest(data);
        await request.validate();

        // If the request body was valid we will create the user
        const user = await this.userRepo.create(data);
        return user;
    }

    /**
     * We will validate the data and update a user with the given id and
     * return the new user
     *
     * @param {number} id of the user
     * @param {*} newUser is the json body of the request
     * @returns {Promise<User>}
     */
    public async update(id: number, newUser: any): Promise<User> {
        const oldUserModel = await this.findOne(id);
        const oldUser = oldUserModel.toJSON();
        const request = new UserUpdateRequest(oldUser);

        request.setFirstName(newUser.firstName);
        request.setLastName(newUser.lastName);
        request.setEmail(newUser.email);

        // Validate request payload
        await request.validate();

        // If the request body was valid we will create the user
        const user = await this.userRepo.update(id, request.toJSON());
        return user;
    }

    /**
     * This will just delete a user
     *
     * @param {number} id of the user
     * @returns {Promise<void>}
     */
    public async destroy(id: number): Promise<void> {
        await this.userRepo.destroy(id);
    }

}
