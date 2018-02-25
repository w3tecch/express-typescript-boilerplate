import { Pet } from '../../../src/api/models/Pet';
import { User } from '../../../src/api/models/User';
import { FactoryInterface, SeedsInterface, times } from '../../lib/seeds';

export class CreatePets implements SeedsInterface {

    public async seed(factory: FactoryInterface): Promise<any> {
        const connection = await factory.getConnection();
        const em = connection.createEntityManager();

        await times(10, async (n) => {
            const pet = await factory.get(Pet).create();
            const user = await factory.get(User).make();
            user.pets = [pet];
            await em.save(user);
        });
    }

}
