
import * as express from 'express';
import * as compression from 'compression';
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';


@Middleware({ type: 'before' })
export class SecurityMiddleware implements ExpressMiddlewareInterface {

    public use(req: any, res: any, next: express.NextFunction): any {
        return compression()(req, res, next);
    }

}
