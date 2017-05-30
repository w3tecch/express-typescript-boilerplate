import * as jwt from 'jsonwebtoken';
import { Knex } from '../../../src/config/Database';
import { Tables } from '../../../src/constants/Tables';


export const USER = {
    firstName: 'Bruce',
    lastName: 'Wayne',
    email: 'bw@enterprice.com',
    auth0UserId: 'batman'
};

export const createAdminUser = async () => {
    const knex = Knex();
    const user = await knex(Tables.Users).insert({
        first_name: USER.firstName,
        last_name: USER.lastName,
        email: USER.email,
        auth_0_user_id: USER.auth0UserId
    });
    await knex.destroy();
    return user;
};

export const getToken = (auth0UserId?: string) => {
    return jwt.sign({
        user_id: `auth0|${auth0UserId || USER.auth0UserId}`
    }, 'auth0-mock');
};
