import * as Faker from 'faker';

import { User } from '../../../src/api/models/User';
import { Factory } from '../../lib/seeds';

const factory = Factory.getInstance();

factory.define(User, (faker: typeof Faker) => {
    const gender = faker.random.number(1);
    const firstName = faker.name.firstName(gender);
    const lastName = faker.name.lastName(gender);
    const email = faker.internet.email(firstName, lastName);

    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    return user;
});
