import { Connection } from 'typeorm/connection/Connection';

import { Factory, Seed } from '../../lib/seed/types';

// import { User } from '../../../src/api/models/User';
export class CreateUsers implements Seed {

    public async seed(factory: Factory, connection: Connection): Promise<any> {
        console.log('CreateUsers');

        // await factory
        //     .get(User)
        //     .createMany(10);
    }

}
