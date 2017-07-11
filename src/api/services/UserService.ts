/**
 * UserService
 * ------------------------------
 *
 * This service is here to validate and call the repository layer for
 * database actions. Furthermore you should throw events here if
 * necessary.
 */

import * as Bookshelf from 'bookshelf';
import { inject, named } from 'inversify';
import { Types, Core, Targets } from '../../constants';
import { Logger as LoggerType } from '../../core/Logger';
import { EventEmitter } from '../../core/api/events';
import { validate, request } from '../../core/api/Validate';
import { NotFoundException } from '../exceptions/NotFoundException';
import { UserCreateRequest } from '../requests/user/UserCreateRequest';
import { UserUpdateRequest } from '../requests/user/UserUpdateRequest';
import { UserRepository } from '../repositories/UserRepository';
import { User } from '../models/User';
import { UserCreatedListener } from '../listeners/user/UserCreatedListener';


export class UserService {

    private log: LoggerType;

    constructor(
        @inject(Types.Repository) @named(Targets.Repository.UserRepository) public userRepo: UserRepository,
        @inject(Types.Core) @named(Core.Logger) public Logger: typeof LoggerType,
        @inject(Types.Core) @named(Core.Events) public events: EventEmitter
    ) {
        this.log = new Logger(__filename);
    }

    /**
     * This returns all user database objects
     */
    public findAll(): Promise<Bookshelf.Collection<User>> {
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
            this.log.warn(`User with the id=${id} was not found!`);
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
            this.log.warn(`User with the userId=${userId} was not found!`);
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
    @validate()
    public async create( @request(UserCreateRequest) data: any): Promise<User> {
        // If the request body was valid we will create the user
        const user = await this.userRepo.create(data);
        this.events.emit(UserCreatedListener.Event, user.toJSON());
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
    @validate()
    public async update(id: number, @request(UserUpdateRequest) newUser: any): Promise<User> {
        // Find or fail
        const user = await this.findOne(id);
        // Set new values
        user.FirstName = newUser.firstName;
        user.LastName = newUser.lastName;
        user.Email = newUser.email;
        // Update user record
        const updatedUser = await this.userRepo.update(id, user.toJSON());
        return updatedUser;
    }

    /**
     * This will just delete a user
     *
     * @param {number} id of the user
     * @returns {Promise<void>}
     */
    public destroy(id: number): Promise<void> {
        return this.userRepo.destroy(id);
    }

}
