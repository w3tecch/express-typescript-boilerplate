import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import * as uuid from 'uuid';

import { User } from '../../../src/api/models/User';

export class CreateBruce implements Seeder {

    public async run(factory: Factory, connection: Connection): Promise<any> {
        const userRepository = connection.getRepository(User);
        const user = new User();
        user.id = uuid.v1();
        user.firstName = 'Bruce';
        user.lastName = 'Wayne';
        user.email = 'bruce.wayne@wayne-enterprises.com';
        user.username = 'bruce';
        user.password = '1234';

        return await userRepository.save(user);
    }
}
