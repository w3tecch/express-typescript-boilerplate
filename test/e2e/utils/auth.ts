import * as nock from 'nock';

import { User } from '../../../src/api/models/User';
import { env } from '../../../src/env';

export const fakeAuthenticationForUser = (user: User, persist = false): nock.Scope => {
    const scope = nock(env.auth.route)
        .post('')
        .reply(200, {
            user_id: `auth0|${user.email}`,
        });
    if (persist) {
        scope.persist();
    }
    return scope;
};
