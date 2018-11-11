import DataLoader from 'dataloader';
import { Arg, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { Service } from 'typedi';

import { DLoader } from '../../decorators/DLoader';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { Context } from '../Context';
import { Pet as PetModel } from '../models/Pet';
import { User as UserModel } from '../models/User';
import { PetService } from '../services/PetService';
import { PetInput } from '../types/input/PetInput';
import { Pet } from '../types/Pet';

@Service()
@Resolver(of => Pet)
export class PetResolver {

    constructor(
        private petService: PetService,
        @Logger(__filename) private log: LoggerInterface,
        @DLoader(UserModel) private userLoader: DataLoader<string, UserModel>
    ) { }

    @Query(returns => [Pet])
    public pets(@Ctx() { requestId }: Context): Promise<PetModel[]> {
        this.log.info(`{${requestId}} Find all users`);
        return this.petService.find();
    }

    @Mutation(returns => Pet)
    public async addPet(@Arg('pet') pet: PetInput): Promise<PetModel> {
        const newPet = new PetModel();
        newPet.name = pet.name;
        newPet.age = pet.age;
        return this.petService.create(newPet);
    }

    @FieldResolver()
    public async owner(@Root() pet: PetModel): Promise<any> {
        if (pet.userId) {
            return this.userLoader.load(pet.userId);
        }
        // return this.userService.findOne(`${pet.userId}`);
    }

    // user: createDataLoader(UserRepository),

    //     petsByUserIds: createDataLoader(PetRepository, {
    //         method: 'findByUserIds',
    //         key: 'userId',
    //         multiple: true,
    //     }),

}
