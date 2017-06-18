/**
 * constants.Targets
 * ------------------------------------------------
 *
 * This is for our IOC so have a unique key/target for
 * our controllers, services and repositories
 *
 * This file is generated with the task `$ npm run console update:targets`.
 */

export const Model = {
    User: 'User'
};

export const Repository = {
    UserRepository: 'UserRepository'
};

export const Service = {
    UserService: 'UserService'
};

export const Middleware = {
    AuthenticateMiddleware: 'AuthenticateMiddleware',
    PopulateUserMiddleware: 'PopulateUserMiddleware'
};

export const Listener = {
    user: {
        UserAuthenticatedListener: 'UserAuthenticatedListener',
        UserCreatedListener: 'UserCreatedListener'
    }
};

export const Controller = {
    UserController: 'UserController'
};
