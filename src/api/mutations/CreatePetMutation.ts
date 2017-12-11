import {
    GraphQLFieldConfig,
    GraphQLNonNull,
    GraphQLString,
    GraphQLInt
} from 'graphql';
import { plainToClass } from 'class-transformer';
import { AbstractGraphQLMutation } from '../../lib/graphql/AbstractGraphQLMutation';
import { PetType } from '../types/PetType';
import { PetService } from '../services/PetService';
import { GraphQLContext, Mutation } from '../../lib/graphql';
import { Pet } from '../models/Pet';

interface CreatePetMutationArguments {
    name: string;
    age: number;
}

@Mutation()
export class CreatePetMutation extends AbstractGraphQLMutation<GraphQLContext<any, any>, Pet, CreatePetMutationArguments> implements GraphQLFieldConfig {
    public type = PetType;
    public args = {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
    };

    public async run(root: any, args: CreatePetMutationArguments, context: GraphQLContext<any, any>): Promise<Pet> {
        const petService = context.container.get<PetService>(PetService);
        const pet = await petService.create(plainToClass(Pet, args));
        return pet;
    }
}
