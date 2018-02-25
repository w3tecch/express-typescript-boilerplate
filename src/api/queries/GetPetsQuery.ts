import { GraphQLFieldConfig, GraphQLList } from 'graphql';

import { Logger, LoggerInterface } from '../../decorators/Logger';
import { AbstractGraphQLQuery, GraphQLContext, Query } from '../../lib/graphql';
import { Pet } from '../models/Pet';
import { PetService } from '../services/PetService';
import { PetType } from '../types/PetType';

@Query()
export class GetPetsQuery extends AbstractGraphQLQuery<GraphQLContext<any, any>, Pet[], any> implements GraphQLFieldConfig {
    public type = new GraphQLList(PetType);
    public allow = [];
    public args = {};

    constructor(
        private petService: PetService,
        @Logger(__filename) private log: LoggerInterface
    ) {
        super();
    }

    public async run(root: any, args: any, context: GraphQLContext<any, any>): Promise<Pet[]> {
        const pets = await this.petService.find();
        this.log.info(`Found ${pets.length} pets`);
        return pets;
    }

}
