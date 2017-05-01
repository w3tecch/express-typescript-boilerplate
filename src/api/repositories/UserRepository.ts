import * as Bookshelf from 'bookshelf';

import * as core from '../../core';
import * as models from '../models';

const log = new core.Log('api:repos:UserRepository');

export class UserRepository {

    constructor(private userModel: typeof models.User) {
        log.debug('constructed');
    }

    public async findAll(): Promise<Bookshelf.Collection<models.User>> {
        const users = await this.userModel.fetchAll();
        return <Bookshelf.Collection<models.User>>users;
    }

    public async findOne(id: number): Promise<models.User> {
        return this.userModel.fetchById(id);
    }

}
