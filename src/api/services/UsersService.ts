import { injectable, inject, named } from 'inversify';
import * as Bookshelf from 'bookshelf';
import * as core from '../../core';
import * as models from '../models';
import * as repo from '../repositories';
import { NotFoundException } from '../exceptions';
import TYPES from '../../constants/types';
import TAGS from '../../constants/tags';

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
        log.debug('constructed', this.userRepo);
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
