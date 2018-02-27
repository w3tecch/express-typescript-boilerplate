import { plainToClass } from 'class-transformer';
import { GraphQLFieldConfig, GraphQLInt, GraphQLNonNull, GraphQLString } from 'graphql';

import { Logger, LoggerInterface } from '../../decorators/Logger';
import { GraphQLContext, Mutation } from '../../lib/graphql';
import { AbstractGraphQLMutation } from '../../lib/graphql/AbstractGraphQLMutation';
import { Pet } from '../models/Pet';
import { PetService } from '../services/PetService';
import { PetType } from '../types/PetType';

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

    constructor(
        private petService: PetService,
        @Logger(__filename) private log: LoggerInterface
    ) {
        super();
    }

    public async run(root: any, args: CreatePetMutationArguments, context: GraphQLContext<any, any>): Promise<Pet> {
        const pet = await this.petService.create(plainToClass(Pet, args));
        this.log.info('Successfully created a new pet');
        return pet;
    }
}
