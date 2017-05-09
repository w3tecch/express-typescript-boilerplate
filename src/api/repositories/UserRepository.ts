import * as Bookshelf from 'bookshelf';
import * as models from '../models';
// import { injectable } from 'inversify';

/**
 * UserRepository
 *
 * @export
 * @class UserRepository
 */
// @injectable()
export class UserRepository {

    public static async findAll(): Promise<Bookshelf.Collection<models.User>> {
        const users = await models.User.fetchAll();
        return <Bookshelf.Collection<models.User>>users;
    }

    public static async findOne(id: number): Promise<models.User> {
        return models.User.fetchById(id);
    }

}
