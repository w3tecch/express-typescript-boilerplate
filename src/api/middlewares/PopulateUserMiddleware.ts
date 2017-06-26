import { inject, named } from 'inversify';
import { Logger as LoggerType } from '../../core/Logger';
import { UserService } from '../services/UserService';
import { Types, Core, Targets } from '../../constants';


export class PopulateUserMiddleware implements interfaces.Middleware {

    public log: LoggerType;

    constructor(
        @inject(Types.Core) @named(Core.Logger) Logger: typeof LoggerType,
        @inject(Types.Service) @named(Targets.Service.UserService) private userService: UserService
    ) {
        this.log = new Logger(__filename);
    }

    public use = (req: myExpress.Request, res: myExpress.Response, next: myExpress.NextFunction): void => {
        // Check if the authenticate middleware was successful
        if (!req.tokeninfo || !req.tokeninfo.user_id) {
            return res.failed(400, 'Missing token information!');
        }
        // Find user from the token and store him in the request object
        this.userService.findByUserId(req.tokeninfo.user_id)
            .then((user) => {
                req.user = user.toJSON();
                this.log.debug(`populated user with the id=${req.user.id} to the request object`);
                next();
            })
            .catch((error) => {
                this.log.warn(`could not populate user to the request object`);
                next(error);
            });
    }

}
