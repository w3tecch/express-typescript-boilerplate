import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { UserRepository } from '../repositories/UserRepository';
import { User } from '../models/User';
import { events } from '../subscribers/events';
import { EventDispatcher, EventDispatcherInterface } from '../../decorators/EventDispatcher';
import { Logger, LoggerInterface } from '../../decorators/Logger';


@Service()
export class UserService {

    constructor(
        @OrmRepository() private userRepository: UserRepository,
        @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public find(): Promise<User[]> {
        this.log.info('Find all users');
        return this.userRepository.find({ relations: ['pets'] });
    }

    public findOne(id: string): Promise<User | undefined> {
        this.log.info('Find all users');
        return this.userRepository.findOne({ id });
    }

    public async create(user: User): Promise<User> {
        this.log.info('Create a new user => ', user.toString());
        const newUser = await this.userRepository.save(user);
        this.eventDispatcher.dispatch(events.user.created, newUser);
        return newUser;
    }

    public update(id: string, user: User): Promise<User> {
        this.log.info('Update a user');
        user.id = id;
        return this.userRepository.save(user);
    }

    public delete(id: string): Promise<void> {
        this.log.info('Delete a user');
        return this.userRepository.removeById(id);
    }

}
