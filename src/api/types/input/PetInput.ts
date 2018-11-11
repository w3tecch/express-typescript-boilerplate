import { Field, InputType, Int } from 'type-graphql';

import { Pet } from '../Pet';

@InputType()
export class PetInput implements Partial<Pet> {

    @Field()
    public name: string;

    @Field(type => Int, {
        description: 'The age of the pet in years.',
    })
    public age: number;

}
