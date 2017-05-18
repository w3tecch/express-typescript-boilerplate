import * as Bookshelf from 'bookshelf';
import { User } from '../models';
import { DatabaseException, NotFoundException } from '../exceptions';

/**
 * UserRepository
 *
 * @export
 * @class UserRepository
 */
export class UserRepository {

    public static async findAll(): Promise<Bookshelf.Collection<User>> {
        const users = await User.fetchAll();
        return <Bookshelf.Collection<User>>users;
    }

    public static async findOne(id: number): Promise<User> {
        return User.fetchById(id);
    }

    public static async create(data: any): Promise<User> {
        const user = User.forge<User>(data);
        try {
            return await user.save();
        } catch (error) {
            throw new DatabaseException('Could not create the user!', error);
        }
    }

    public static async update(id: number, data: any): Promise<User> {
        const user = User.forge<User>({ id: id });
        try {
            return await user.save(data, { patch: true });
        } catch (error) {
            throw new DatabaseException('Could not update the user!', error);
        }
    }

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
