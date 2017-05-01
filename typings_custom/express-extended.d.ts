declare module 'express-extended' {

    import * as express from 'express';
    import * as auth0 from 'auth0';


    interface Application extends express.Application {
    }

    interface NextFunction extends express.NextFunction {
    }

    interface Request extends express.Request {
        user: auth0.User;
    }

    interface Response extends express.Response { }

}
