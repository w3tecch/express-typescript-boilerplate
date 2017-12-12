import * as nock from 'nock';
import { User } from '../../../src/api/models/User';
import { env } from '../../../src/core/env';


export const fakeAuthenticationForUser = (user: User): nock.Scope => {
    return nock(env.auth.route)
        .persist()
        .post('')
        .reply(200, {
            user_id: `auth0|${user.email}`,
        });
};
