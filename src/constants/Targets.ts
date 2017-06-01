/**
 * constants.Targets
 * ------------------------------------------------
 *
 * This is for our IOC so have a unique key/target for
 * our controllers, services and repositories
 */

export const Lib = {
    Request: 'Request'
};

export const Core = {
    Events: 'Events',
    Log: 'Log'
};

export const Controller = {
    UserController: 'UserController',
    auth: {
        AuthController: 'auth.AuthController'
    }
};

export const Service = {
    UserService: 'UserService'
};

export const Model = {
    User: 'User'
};

export const Repository = {
    UserRepository: 'UserRepository'
};

export const Middleware = {
    AuthenticateMiddleware: 'AuthenticateMiddleware'
};
