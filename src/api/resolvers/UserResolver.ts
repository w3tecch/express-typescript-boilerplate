import { FieldResolver, Query, Resolver, Root } from 'type-graphql';
import { Service } from 'typedi';

import { User as UserModel } from '../models/User';
import { PetService } from '../services/PetService';
import { UserService } from '../services/UserService';
import { User } from '../types/User';

@Service()
@Resolver(of => User)
export class UserResolver {

    constructor(
        private userService: UserService,
        private petService: PetService
        ) {}

    @Query(returns => [User])
    public users(): Promise<any> {
      return this.userService.find();
    }

    @FieldResolver()
    public async pets(@Root() user: UserModel): Promise<any> {
        return this.petService.findByUser(user);
    }

}
