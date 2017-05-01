import * as Knex from 'knex';

import * as models from '../../api/models';
import { Factory } from '../factories';


exports.seed = async (db: Knex) => {
    const factory = Factory.getInstance();
    await factory.get(models.User)
        .create(10);
};
