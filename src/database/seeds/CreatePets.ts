import { Connection } from 'typeorm';

import { Pet } from '../../../src/api/models/Pet';
import { User } from '../../../src/api/models/User';
import { Factory, Seed, times } from '../../lib/seed';

export class CreatePets implements Seed {

    public async seed(factory: Factory, connection: Connection): Promise<any> {
        console.log('CreatePets');

        // const connection = await factory.getConnection();
        const em = connection.createEntityManager();

        await times(10, async (n) => {
            const pet = await factory<Pet, undefined>(Pet as any)().seed();
            const user = await factory<User, undefined>(User as any)().make();
            user.pets = [pet];
            await em.save(user);
        });
    }

}
