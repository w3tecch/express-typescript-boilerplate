import { my } from 'my-express';
import { Log } from '../../core/log';

const log = new Log('api:middleware.authenticate');

/**
 * authenticate middleware
 * -----------------------
 * This middleware can be used to check if all credentials are given and
 * verify them.
 *
 * @param req
 * @param res
 * @param next
 */
export const authenticate = (req: my.Request, res: my.Response, next: my.NextFunction) => {
    log.info('authenticate');
    next();
};
