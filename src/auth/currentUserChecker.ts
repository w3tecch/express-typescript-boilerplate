import { Action } from 'routing-controllers';
import { User } from '../api/models/User';
import { Log } from '../core/Log';
import { ITokenInfo } from './ITokenInfo';
// import { UserRepository } from '../api/repositories/UserRepository';
// import { getConnection } from 'typeorm';

const log = new Log(__filename);


export async function currentUserChecker(action: Action): Promise<User | undefined> {
    // here you can use request/response objects from action
    // you need to provide a user object that will be injected in controller actions
    // demo code:
    const tokeninfo: ITokenInfo = action.request.tokeninfo;
    log.info('todo user checker', tokeninfo);

    // const connection = getConnection();

    // const userRepository = connection.getRepository<User>(UserRepository);
    // console.log(connection);
    // const user = await userRepository.
    //     findOne({
    //         where: {
    //             email: tokeninfo.user_id
    //         }
    //     });
    // console.log(user);

    return Promise.resolve(new User());
}

