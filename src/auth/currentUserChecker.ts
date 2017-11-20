import { Action } from 'routing-controllers';
import { User } from '../api/models/User';
import { Log } from '../core/Log';
import { ITokenInfo } from './ITokenInfo';
import { Connection } from 'typeorm';


export function currentUserChecker(connection: Connection): (action: Action) => Promise<User | undefined> {
    const log = new Log(__filename);

    return async function innerCurrentUserChecker(action: Action): Promise<User | undefined> {
        // here you can use request/response objects from action
        // you need to provide a user object that will be injected in controller actions
        // demo code:
        const tokeninfo: ITokenInfo = action.request.tokeninfo;
        const em = connection.createEntityManager();
        const user = await em.findOne<User>(User, {
            where: {
                email: tokeninfo.user_id,
            },
        });
        if (user) {
            log.info('Current user is ', user.toString());
        } else {
            log.info('Current user is undefined');
        }

        return user;
    };
}

