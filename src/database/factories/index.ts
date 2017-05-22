import { Factory } from '../../core/database/Factory';
import { User } from '../../api/models/User';

/**
 * FACTORIES
 * ----------------------------------------
 * Define all your factories here. These factories are used to seed
 * data very easy into your database.
 */
const factory = Factory.getInstance();

/**
 * USER - Factory
 */
factory.define(User, (faker: Faker.FakerStatic) => {
    const gender = faker.random.number(1);
    const fn = faker.name.firstName(gender);
    const ln = faker.name.lastName(gender);
    const e = faker.internet.email(fn, ln);
    return {
        firstName: fn,
        lastName: ln,
        email: e,
        auth0UserId: 'auth0|' + e,
        picture: faker.internet.avatar()
    };
});


export * from '../../core/database/Factory';
