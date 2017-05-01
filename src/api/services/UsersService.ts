import * as Bookshelf from 'bookshelf';

import * as core from '../../core';
import * as models from '../models';
import * as repo from '../repositories';
import { NotFoundException } from '../exceptions';

const log = new core.Log('api:services:UserService');


export class UserService {

    constructor(public userRepo: repo.UserRepository) {
        log.debug('constructed');
    }

    public async findAll(): Promise<Bookshelf.Collection<models.User>> {
        return this.userRepo.findAll();
    }

    public async findOne(id: number): Promise<models.User> {
        let user = await this.userRepo.findOne(id);
        if (user === null) {
            throw new NotFoundException(id);
        }
        return user;
    }

}
