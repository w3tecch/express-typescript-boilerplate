import * as Bookshelf from 'bookshelf';
import { User } from '../models/User';
import { DatabaseException } from '../exceptions/DatabaseException';
import { NotFoundException } from '../exceptions/NotFoundException';

/**
 * UserRepository
 *
 * @export
 * @class UserRepository
 */
export class UserRepository {

    /**
     * Retrieves all user data out of the database
     *
     * @static
     * @returns {Promise<Bookshelf.Collection<User>>}
     *
     * @memberof UserRepository
     */
    public static async findAll(): Promise<Bookshelf.Collection<User>> {
        const users = await User.fetchAll();
        return <Bookshelf.Collection<User>>users;
    }

    /**
     * Retrieves one user entity of the database
     *
     * @static
     * @param {number} id of the user
     * @returns {Promise<User>}
     */
    public static async findOne(id: number): Promise<User> {
        return User.fetchById(id);
    }

    /**
     * Retrieves one user entity of the database
     *
     * @static
     * @param {number} id of the user
     * @returns {Promise<User>}
     */
    public static async findByUserId(userId: string): Promise<User> {
        return User.fetchByUserId(userId);
    }

    /**
     * Creates a new user entity in the database and returns
     * the new created entity
     *
     * @static
     * @param {*} data is the new user
     * @returns {Promise<User>}
     */
    public static async create(data: any): Promise<User> {
        const user = User.forge<User>(data);
        try {
            const createdUser = await user.save();
            return await User.fetchById(createdUser.id);
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
    public static async update(id: number, data: any): Promise<User> {
        const user = User.forge<User>({ id: id });
        try {
            const updatedUser = await user.save(data, { patch: true });
            return await User.fetchById(updatedUser.id);

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
    public static async destroy(id: number): Promise<void> {
        let user = User.forge<User>({ id: id });
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
