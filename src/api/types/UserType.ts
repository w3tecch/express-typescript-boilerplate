import {
    GraphQLID,
    GraphQLString,
    GraphQLObjectType,
} from 'graphql';

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
        // pets: {
        //     type: GraphQLString,
        //     description: 'The personal number of this user.‚',
        // },
    },
});
