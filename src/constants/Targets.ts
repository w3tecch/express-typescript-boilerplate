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
    Pet: 'Pet',
    User: 'User'
};

export const Repository = {
    PetRepository: 'PetRepository',
    UserRepository: 'UserRepository'
};

export const Service = {
    PetService: 'PetService',
    UserService: 'UserService'
};

export const Middleware = {
    AuthenticateMiddleware: 'AuthenticateMiddleware',
    PopulateUserMiddleware: 'PopulateUserMiddleware'
};

export const Listener = {
    UserAuthenticatedListener: 'UserAuthenticatedListener',
    UserCreatedListener: 'UserCreatedListener'
};

export const Controller = {
    auth: {
        AuthController: 'AuthController'
    },
    PetController: 'PetController',
    UserController: 'UserController'
};
