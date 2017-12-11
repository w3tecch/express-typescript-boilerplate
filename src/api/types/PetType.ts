import {
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLObjectType,
    GraphQLFieldConfigMap,
} from 'graphql';
import { OwnerType } from './UserType';
import { Pet } from '../models/Pet';
import { GraphQLContext } from '../../lib/graphql';

const PetFields: GraphQLFieldConfigMap = {
    id: {
        type: GraphQLID,
        description: 'The ID',
    },
    name: {
        type: GraphQLString,
        description: 'The name of the pet.',
    },
    age: {
        type: GraphQLInt,
        description: 'The age of the pet in years.',
    },
};

export const PetOfUserType = new GraphQLObjectType({
    name: 'PetOfUser',
    description: 'A users pet',
    fields: () => ({ ...PetFields, ...{} }),
});

export const PetType = new GraphQLObjectType({
    name: 'Pet',
    description: 'A single pet.',
    fields: () => ({ ...PetFields, ...{
        owner: {
            type: OwnerType,
            description: 'The owner of the pet',
            resolve: (pet: Pet, args: any, context: GraphQLContext<any, any>) =>
                context.dataLoaders.users.load(pet.userId),
        },
    } }),
});
