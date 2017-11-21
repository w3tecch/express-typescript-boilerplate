import * as Faker from 'faker';
import { Factory } from '../../../lib/seeds';
import { User } from '../../../src/api/models/User';


const factory = Factory.getInstance();

/**
 * User factory
 */
factory.define(User, (faker: typeof Faker) => {
    const gender = faker.random.number(1);
    const fn = faker.name.firstName(gender);
    const ln = faker.name.lastName(gender);
    const e = faker.internet.email(fn, ln);

    const user = new User();
    user.firstName = fn;
    user.lastName = ln;
    user.email = e;
    return user;
});
