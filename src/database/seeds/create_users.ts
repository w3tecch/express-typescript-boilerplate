import * as Knex from 'knex';

import { User } from '../../api/models/User';
import { Factory } from '../factories';


exports.seed = async (db: Knex) => {
    const factory = Factory.getInstance();
    await factory.get(User)
        .create(10);
};
