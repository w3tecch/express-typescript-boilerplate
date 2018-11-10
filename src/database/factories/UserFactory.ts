import * as Faker from 'faker';
import { define } from 'typeorm-seeding';
import * as uuid from 'uuid';

import { User } from '../../../src/api/models/User';

define(User, (faker: typeof Faker, settings: { role: string }) => {
    const gender = faker.random.number(1);
    const firstName = faker.name.firstName(gender);
    const lastName = faker.name.lastName(gender);
    const email = faker.internet.email(firstName, lastName);
    const username = faker.internet.userName(firstName, lastName);

    const user = new User();
    user.id = uuid.v1();
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.username = username;
    user.password = '1234';
    return user;
});
