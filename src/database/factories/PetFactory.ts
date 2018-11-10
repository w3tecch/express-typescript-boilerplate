import * as Faker from 'faker';
import { define } from 'typeorm-seeding';
import * as uuid from 'uuid';

import { Pet } from '../../../src/api/models/Pet';

define(Pet, (faker: typeof Faker) => {
    const gender = faker.random.number(1);
    const name = faker.name.firstName(gender);

    const pet = new Pet();
    pet.id = uuid.v1();
    pet.name = name;
    pet.age = faker.random.number();
    return pet;
});
