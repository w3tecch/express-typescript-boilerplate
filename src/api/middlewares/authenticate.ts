import * as request from 'request';
import { my } from 'my-express';
import { Log } from '../../core/log';

const log = new Log('api:middleware.authenticate');

/**
 * authenticate middleware
 * -----------------------
 * This middleware secures your resources with the auth0 authentication.
 *
 * @param req
 * @param res
 * @param next
 */
export const authenticate = (req: my.Request, res: my.Response, next: my.NextFunction) => {
    const token = getToken(req);

    if (token === null) {
        log.warn('No token given');
        return res.failed(403, 'You are not allowed to request this resource!');
    }
    log.debug('Token is provided');

    // Request user info at auth0 with the provided token
    request.post({
        url: `${process.env.AUTH0_HOST}/tokeninfo`,
        form: {
            id_token: token
        }
    }, (error: any, response: request.RequestResponse, body: any) => {

        // Verify if the requests was successful and append user
        // information to our extended express request object
        if (!error && response.statusCode === 200) {
            req.tokeninfo = JSON.parse(body);
            log.info(`Retrieved user ${req.tokeninfo.email}`);
            return next();
        }

        // Catch auth0 exception and return it as it is
        log.warn(`Could not retrieve the user, because of`, body);
        res.failed(response.statusCode || 401, body);

    });

};

/**
 * Returns the access token of the given request header
 */
const getToken = (req: my.Request): string | null => {
    const authorization = req.headers.authorization;

    // Retrieve the token form the Authorization header
    if (authorization && authorization.split(' ')[0] === 'Bearer') {
        return authorization.split(' ')[1];
    }

    // No token was provided by the client
    return null;
};
