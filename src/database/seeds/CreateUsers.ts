import { Connection } from 'typeorm/connection/Connection';

import { User } from '../../../src/api/models/User';
import { Factory, Seed } from '../../lib/seed/types';

export class CreateUsers implements Seed {

    public async seed(factory: Factory, connection: Connection): Promise<any> {
        await factory(User)().seedMany(10);
    }

}
