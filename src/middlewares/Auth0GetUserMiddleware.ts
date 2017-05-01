import * as express from 'express-extended';
import * as request from 'request';

import * as core from '../core';

const log = new core.Log('app:middlewares:Auth0GetUserMiddleware');


export interface Auth0GetUserMiddlewareOptions {
    host: string; //core.Environment.getConfig().auth0.host
    withQueryString?: boolean; //core.Environment.isDevelopment()
}

class Auth0GetUserMiddleware implements core.Passable {

    static QUERY_STRING = 'access_token';

    constructor(private options: Auth0GetUserMiddlewareOptions) {
        log.debug('constructed', options);
    }

    public async pass(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
        const token = this.getToken(req);
        log.debug(!!token ? 'Token is provided' : 'No token given');

        // Request user info at auth0 with the provided token
        request.post({
            url: `${this.options.host}/tokeninfo`,
            form: {
                id_token: token
            }
        }, (error: any, response: request.RequestResponse, body: any) => {

            // Verify if the reuest was successfull and append user information to our extended express request object
            if (!error && response.statusCode === 200) {
                req.user = JSON.parse(body);
                log.info(`Retrieved user ${req.user.username}`);
                next();

                // Catch auth0 exception and return it as it is
            } else {
                log.warn(`Could not retrieve the user, because of`, body);
                res.status(response.statusCode || 401).json(body);
            }
        });
    }

    private getToken(req: express.Request): string | null {
        let authorization = req.headers.authorization;

        // Retrieve the token form the Authorization header
        if (authorization && authorization.split(' ')[0] === 'Bearer') {
            return authorization.split(' ')[1];

            // Only in development environment get token of the query parameter access_token aswell
        } else if (this.options.withQueryString && req.query && req.query[Auth0GetUserMiddleware.QUERY_STRING]) {
            return req.query[Auth0GetUserMiddleware.QUERY_STRING];
        }

        // No token was provided by the client
        return null;
    }
}


export const auth0GetUser = (options: Auth0GetUserMiddlewareOptions) => {
    const middleware = new Auth0GetUserMiddleware(options);
    return middleware.pass.bind(middleware);
};
