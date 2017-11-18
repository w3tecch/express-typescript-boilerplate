import { Service } from 'typedi';
import { Repository, EntityRepository } from 'typeorm';
import { User } from '../models/User';


@Service()
@EntityRepository(User)
export class UserRepository extends Repository<User>  {

}
