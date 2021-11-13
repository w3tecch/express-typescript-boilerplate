import { Connection } from 'typeorm';
import { Factory, Seeder, times } from 'typeorm-seeding';

import { Pet } from '../../../src/api/models/Pet';
import { User } from '../../../src/api/models/User';

export class CreatePets implements Seeder {

    public async run(factory: Factory, connection: Connection): Promise<any> {
        const em = connection.createEntityManager();
        await times(10, async (n) => {
            const pet = await factory(Pet)().seed();
            const user = await factory(User)().make();
            user.pets = [pet];
            return await em.save(user);
        });
    }

}
