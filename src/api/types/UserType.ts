import {
    GraphQLFieldConfigMap, GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString
} from 'graphql';

import { GraphQLContext } from '../../lib/graphql';
import { User } from '../models/User';
import { PetOfUserType } from './PetType';

const UserFields: GraphQLFieldConfigMap = {
    id: {
        type: GraphQLID,
        description: 'The ID',
    },
    firstName: {
        type: GraphQLString,
        description: 'The first name of the user.',
    },
    lastName: {
        type: GraphQLString,
        description: 'The last name of the user.',
    },
    email: {
        type: GraphQLString,
        description: 'The email of this user.',
    },
};

export const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'A single user.',
    fields: () => ({ ...UserFields, ...{
        pets: {
            type: new GraphQLList(PetOfUserType),
            description: 'The pets of a user',
            resolve: async (user: User, args: any, context: GraphQLContext<any, any>) =>
                // We use data-loaders to save db queries
                context.dataLoaders.petsByUserIds.load(user.id),
                // This would be the case with a normal service, but not very fast
                // context.container.get<PetService>(PetService).findByUser(user),
        },
    } }),
});

export const OwnerType = new GraphQLObjectType({
    name: 'Owner',
    description: 'The owner of a pet',
    fields: () => ({ ...UserFields, ...{} }),
});
