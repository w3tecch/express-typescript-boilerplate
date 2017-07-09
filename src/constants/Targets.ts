/**
 * constants.Targets
 * ------------------------------------------------
 *
 * This is for our IOC so have a unique key/target for
 * our controllers, services and repositories
 *
 * This file is generated with the task `$ npm run console update:targets`.
 */

export const Targets = {
    Model:     {
        Pet: 'Pet',
        User: 'User'
    },
    Repository:     {
        PetRepository: 'PetRepository',
        UserRepository: 'UserRepository'
    },
    Service:     {
        PetService: 'PetService',
        UserService: 'UserService'
    },
    Middleware:     {
        AuthenticateMiddleware: 'AuthenticateMiddleware',
        PopulateUserMiddleware: 'PopulateUserMiddleware'
    },
    Listener:     {
        user: {
            UserAuthenticatedListener: 'UserAuthenticatedListener',
            UserCreatedListener: 'UserCreatedListener'
        }
    },
    Controller:     {
        PetController: 'PetController',
        UserController: 'UserController'
    }
};
