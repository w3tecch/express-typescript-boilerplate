
import * as express from 'express';
import * as compression from 'compression';
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';


@Middleware({ type: 'after' })
export class SecurityMiddleware implements ExpressMiddlewareInterface {

    public use(req: express.Request, res: express.Response, next: express.NextFunction): any {
        return compression()(req, res, next);
    }

}
