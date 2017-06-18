import { inject, named } from 'inversify';
import * as Request from 'request';
import { myExpress } from 'my-express';
import { Log } from '../../core/log';
import { Types } from '../../constants/Types';
import { Core } from '../../core/Targets';
import { events } from '../../core/api/events';
import { UserAuthenticatedListener } from '../listeners/UserAuthenticatedListener';


export class AuthenticateMiddleware {

    public log: Log;

    constructor(
        @inject(Types.Core) @named(Core.Log) Logger: typeof Log,
        @inject(Types.Lib) @named('request') private request: typeof Request
    ) {
        this.log = new Logger('api:middleware:AuthenticateMiddleware');
    }


    public use = (req: myExpress.Request, res: myExpress.Response, next: myExpress.NextFunction): void => {
        const token = this.getToken(req);

        if (token === null) {
            this.log.warn('No token given');
            return res.failed(403, 'You are not allowed to request this resource!');
        }
        this.log.debug('Token is provided');

        // Request user info at auth0 with the provided token
        this.request({
            method: 'POST',
            url: `${process.env.AUTH0_HOST}/tokeninfo`,
            form: {
                id_token: token
            }
        }, (error: any, response: Request.RequestResponse, body: any) => {
            // Verify if the requests was successful and append user
            // information to our extended express request object
            if (!error && response.statusCode === 200) {
                req.tokeninfo = JSON.parse(body);
                this.log.info(`Retrieved user ${req.tokeninfo.email}`);
                events.emit(UserAuthenticatedListener.Event, req.tokeninfo);
                return next();
            }

            // Catch auth0 exception and return it as it is
            this.log.warn(`Could not retrieve the user, because of`, body);
            let statusCode = 401;
            if (response && response.statusCode) {
                statusCode = response.statusCode;
            } else {
                this.log.warn('It seems your oauth server is down!');
            }
            res.failed(statusCode, body);

        });
    }

    private getToken(req: myExpress.Request): string | null {
        const authorization = req.headers.authorization;

        // Retrieve the token form the Authorization header
        if (authorization && authorization.split(' ')[0] === 'Bearer') {
            return authorization.split(' ')[1];
        }

        // No token was provided by the client
        return null;
    }

}
