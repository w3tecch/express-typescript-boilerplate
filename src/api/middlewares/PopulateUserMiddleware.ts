import { inject, named } from 'inversify';
import { myExpress } from 'my-express';
import { Log } from '../../core/log';
import { UserService } from '../services/UserService';
import { Types } from '../../constants/Types';
import { Core } from '../../core/Targets';
import { Service } from '../../constants/Targets';


export class PopulateUserMiddleware {

    public log: Log;

    constructor(
        @inject(Types.Core) @named(Core.Log) Logger: typeof Log,
        @inject(Types.Service) @named(Service.UserService) private userService: UserService
    ) {
        this.log = new Logger('api:middleware:PopulateUserMiddleware');
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
