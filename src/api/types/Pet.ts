import { Field, ID, Int, ObjectType } from 'type-graphql';

import { User } from './User';

@ObjectType({
    description: 'Pet object.',
})
export class Pet {

    @Field(type => ID)
    public id: string;

    @Field({
        description: 'The name of the pet.',
    })
    public name: string;

    @Field(type => Int, {
        description: 'The age of the pet in years.',
    })
    public age: number;

    @Field(type => User, {
        nullable: true,
    })
    public owner: User;

}
