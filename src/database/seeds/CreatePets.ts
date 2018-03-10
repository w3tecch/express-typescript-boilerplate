import { Connection } from 'typeorm';

import { Factory, Seed } from '../../lib/seed/types';

// import { Pet } from '../../../src/api/models/Pet';
// import { User } from '../../../src/api/models/User';
export class CreatePets implements Seed {

    public async seed(factory: Factory, connection: Connection): Promise<any> {
        console.log('CreatePets');

        // const connection = await factory.getConnection();
        // const em = connection.createEntityManager();

        // await times(10, async (n) => {
        //     const pet = await factory.get(Pet).create();
        //     const user = await factory.get(User).make();
        //     user.pets = [pet];
        //     await em.save(user);
        // });
    }

}
