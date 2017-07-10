import * as Knex from 'knex';

import { Factory } from '../factories';
import { User } from '../../api/models/User';


exports.seed = async (db: Knex) => {
    const factory = Factory.getInstance();
    await factory.get(User)
        .create(10);
};
