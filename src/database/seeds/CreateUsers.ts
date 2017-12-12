import { SeedsInterface, FactoryInterface } from '../../lib/seeds';
import { User } from '../../../src/api/models/User';


export class CreateUsers implements SeedsInterface {

    public async seed(factory: FactoryInterface): Promise<any> {
        await factory
            .get(User)
            .createMany(10);
    }

}
