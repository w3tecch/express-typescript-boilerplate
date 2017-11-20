import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { EventDispatcher } from 'event-dispatch';
import { UserRepository } from '../repositories/UserRepository';
import { User } from '../models/User';
import { events } from '../subscribers/events';


@Service()
export class UserService {

    constructor(
        @OrmRepository() private userRepository: UserRepository
    ) { }

    public find(): Promise<User[]> {
        return this.userRepository.find();
    }

    public findOne(id: string): Promise<User | undefined> {
        return this.userRepository.findOne({ id });
    }

    public async create(user: User): Promise<User> {
        const newUser = await this.userRepository.save(user);
        const eventDispatcher = new EventDispatcher();
        eventDispatcher.dispatch(events.user.created, newUser);
        return newUser;
    }

    public update(id: string, user: User): Promise<User> {
        user.id = id;
        return this.userRepository.save(user);
    }

    public delete(id: string): Promise<void> {
        return this.userRepository.removeById(id);
    }

}
