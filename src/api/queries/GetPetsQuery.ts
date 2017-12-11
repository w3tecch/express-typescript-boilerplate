import { GraphQLFieldConfig, GraphQLList } from 'graphql';
import { Query, AbstractGraphQLQuery, GraphQLContext } from './../../lib/graphql';
import { PetService } from '../services/PetService';
import { PetType } from './../types/PetType';
import { Logger } from '../../core/Logger';
import { Pet } from '../models/Pet';

@Query()
export class GetPetsQuery extends AbstractGraphQLQuery<GraphQLContext<any, any>, Pet[], any> implements GraphQLFieldConfig {
    public type = new GraphQLList(PetType);
    public allow = [];
    public args = {};

    private log = new Logger(__filename);

    public async run(root: any, args: any, context: GraphQLContext<any, any>): Promise<Pet[]> {
        const pets = await context.container.get<PetService>(PetService).find();
        this.log.info(`Found ${pets.length} pets`);
        return pets;
    }

}
