import { User } from '../../../src/api/models/User';
import { FactoryInterface, SeedsInterface } from '../../lib/seeds';

export class CreateUsers implements SeedsInterface {

    public async seed(factory: FactoryInterface): Promise<any> {
        await factory
            .get(User)
            .createMany(10);
    }

}
