import { PetService } from './../services/PetService';
import {
    GraphQLID,
    GraphQLString,
    GraphQLObjectType,
    GraphQLList,
} from 'graphql';
import { PetType } from './PetType';
import { User } from '../models/User';
import { GraphQLContext } from '../../lib/graphql';

export const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'A single user.',
    fields: {
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
        pets: {
            type: new GraphQLList(PetType),
            description: 'The pets of a user',
            resolve: (user: User, args: any, context: GraphQLContext<any, any>) =>
                context.container.get<PetService>(PetService).findByUser(user),
        },
    },
});
