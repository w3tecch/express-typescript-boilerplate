import { Repository, EntityRepository } from 'typeorm';
import { Pet } from '../models/Pet';

@EntityRepository(Pet)
export class PetRepository extends Repository<Pet> {

    /**
     * Find by userId is used for our data-loader to get all needed pets in one query.
     */
    public findByUserIds(ids: string[]): Promise<Pet[]> {
        return this.createQueryBuilder()
            .select()
            .where(`pet.userId IN (${ids.map(id => `'${id}'`).join(', ')})`)
            .getMany();
    }

}
