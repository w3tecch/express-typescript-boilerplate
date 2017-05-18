declare module 'my-express' {

    import * as express from 'express';
    import * as auth0 from 'auth0';

    namespace my  {

        interface Application extends express.Application {
        }

        interface NextFunction extends express.NextFunction {
        }

        interface Request extends express.Request {
            user: auth0.User;
        }

        interface Response extends express.Response {
            ok<T>(data: T, options?: ResponseOptions): void;
            created<T>(data: T, options?: ResponseOptions): void;
            found<T>(data: T, options?: ResponseOptions): void;
            updated<T>(data: T, options?: ResponseOptions): void;
            destroyed<T>(options?: ResponseOptions): void;
            failed<T>(status: number, message: string, error: any): void;
        }

        interface ResponseOptions {
            message?: string;
            links?: ResponseLinks[];
        }

        interface ResponseLinks {
            name: string;
            url: string;
        }
    }

}
