import { Repository, EntityRepository } from 'typeorm';
import { Pet } from '../models/Pet';

@EntityRepository(Pet)
export class PetRepository extends Repository<Pet>  {

}
