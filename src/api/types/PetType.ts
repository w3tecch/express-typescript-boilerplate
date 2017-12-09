import {
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLObjectType,
} from 'graphql';

export const PetType = new GraphQLObjectType({
    name: 'Pet',
    description: 'A single pet.',
    fields: {
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
    },
});
