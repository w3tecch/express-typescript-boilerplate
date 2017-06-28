/**
 * UserRepository
 * ------------------------------
 */

import * as Bookshelf from 'bookshelf';
import { inject, named } from 'inversify';
import { Types, Targets } from '../../constants';
import { User } from '../models/User';
import { DatabaseException } from '../exceptions/DatabaseException';
import { NotFoundException } from '../exceptions/NotFoundException';


export class UserRepository {

    constructor(
        @inject(Types.Model) @named(Targets.Model.User) public UserModel: typeof User
    ) { }

    /**
     * Retrieves all user data out of the database
     *
     * @static
     * @returns {Promise<Bookshelf.Collection<User>>}
     *
     * @memberof UserRepository
     */
    public async findAll(): Promise<Bookshelf.Collection<User>> {
        return this.UserModel.fetchAll<User>();
    }

    /**
     * Retrieves one user entity of the database
     *
     * @static
     * @param {number} id of the user
     * @returns {Promise<User>}
     */
    public async findOne(id: number): Promise<User> {
        return this.UserModel.fetchById(id);
    }

    /**
     * Retrieves one user entity of the database
     *
     * @static
     * @param {number} id of the user
     * @returns {Promise<User>}
     */
    public async findByUserId(userId: string): Promise<User> {
        return this.UserModel.fetchByUserId(userId);
    }

    /**
     * Creates a new user entity in the database and returns
     * the new created entity
     *
     * @static
     * @param {*} data is the new user
     * @returns {Promise<User>}
     */
    public async create(data: any): Promise<User> {
        const user = this.UserModel.forge<User>(data);
        try {
            const createdUser = await user.save();
            return this.UserModel.fetchById(createdUser.id);
        } catch (error) {
            throw new DatabaseException('Could not create the user!', error);
        }
    }

    /**
     * Updates a already existing entity and returns the new one
     *
     * @static
     * @param {number} id
     * @param {*} data
     * @returns {Promise<User>}
     */
    public async update(id: number, data: any): Promise<User> {
        const user = this.UserModel.forge<User>({ id });
        try {
            const updatedUser = await user.save(data, { patch: true });
            return this.UserModel.fetchById(updatedUser.id);

        } catch (error) {
            throw new DatabaseException('Could not update the user!', error);
        }
    }

    /**
     * Removes a entity in the database, but if there is not user
     * with the given id, we will throw a Not-Found exception
     *
     * @static
     * @param {number} id
     * @returns {Promise<void>}
     */
    public async destroy(id: number): Promise<void> {
        let user = this.UserModel.forge<User>({ id });
        try {
            user = await user.fetch({ require: true });
        } catch (error) {
            throw new NotFoundException(id);
        }

        try {
            await user.destroy();
            return;
        } catch (error) {
            throw new DatabaseException('Could not delete the user!', error);
        }
    }

}
