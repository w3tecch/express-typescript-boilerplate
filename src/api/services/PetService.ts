import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { PetRepository } from '../repositories/PetRepository';
import { Pet } from '../models/Pet';
import { events } from '../subscribers/events';
import { EventDispatcher, EventDispatcherInterface } from '../../decorators/EventDispatcher';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { User } from '../models/User';


@Service()
export class PetService {

    constructor(
        @OrmRepository() private petRepository: PetRepository,
        @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public find(): Promise<Pet[]> {
        this.log.info('Find all pets');
        return this.petRepository.find();
    }

    public findByUser(user: User): Promise<Pet[]> {
        this.log.info('Find all pets of the user', user.toString());
        return this.petRepository.find({
            where: {
                userId: user.id,
            },
        });
    }

    public findOne(id: string): Promise<Pet | undefined> {
        this.log.info('Find all pets');
        return this.petRepository.findOne({ id });
    }

    public async create(pet: Pet): Promise<Pet> {
        this.log.info('Create a new pet => ', pet.toString());
        const newPet = await this.petRepository.save(pet);
        this.eventDispatcher.dispatch(events.pet.created, newPet);
        return newPet;
    }

    public update(id: string, pet: Pet): Promise<Pet> {
        this.log.info('Update a pet');
        pet.id = id;
        return this.petRepository.save(pet);
    }

    public delete(id: string): Promise<void> {
        this.log.info('Delete a pet');
        return this.petRepository.removeById(id);
    }

}
