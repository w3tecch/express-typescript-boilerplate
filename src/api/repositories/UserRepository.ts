import { Repository, EntityRepository } from 'typeorm';
import { User } from '../models/User';

@EntityRepository(User)
export class UserRepository extends Repository<User>  {

}
