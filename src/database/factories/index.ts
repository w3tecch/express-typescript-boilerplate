import * as core from '../../core';
import * as models from '../../api/models';

/**
 * Defines the factory
 */
const factory = core.Factory.getInstance();


/**
 * Defines a factory for a default user
 */
factory.define(models.User, (faker: Faker.FakerStatic) => {
    const gender = faker.random.number(1);
    const fn = faker.name.firstName(gender);
    const ln = faker.name.lastName(gender);
    return {
        firstName: fn,
        lastName: ln,
        username: faker.internet.userName(fn, ln),
        email: faker.internet.email(fn, ln),
        picture: faker.internet.avatar()
    };
});

export * from '../../core/database/Factory'
