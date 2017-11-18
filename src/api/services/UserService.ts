import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { UserRepository } from '../repositories/UserRepository';
import { User } from '../models/User';


@Service()
export class UserService {

    @OrmRepository()
    private userRepository: UserRepository;

    public find(): Promise<User[]> {
        return this.userRepository.find();
    }

    public findOne(id: string): Promise<User | undefined> {
        return this.userRepository.findOne({ id });
    }

    public create(user: User): Promise<User> {
        return this.userRepository.save(user);
    }

    public update(id: string, user: User): Promise<User> {
        user.id = id;
        return this.userRepository.save(user);
    }

    public delete(id: string): Promise<void> {
        return this.userRepository.removeById(id);
    }

}
