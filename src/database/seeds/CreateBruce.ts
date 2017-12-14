import { SeedsInterface, FactoryInterface } from '../../lib/seeds';
import { User } from '../../../src/api/models/User';


export class CreateBruce implements SeedsInterface {

    public async seed(factory: FactoryInterface): Promise<User> {
        const connection = await factory.getConnection();
        const em = connection.createEntityManager();

        const user = new User();
        user.firstName = 'Bruce';
        user.lastName = 'Wayne';
        user.email = 'bruce.wayne@wayne-enterprises.com';
        return await em.save(user);
    }

}
