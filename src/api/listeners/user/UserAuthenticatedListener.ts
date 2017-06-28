import { inject, named } from 'inversify';
import { Types, Core } from '../../../constants';
import { Logger as LoggerType } from '../../../core/Logger';


export class UserAuthenticatedListener implements interfaces.Listener {

    public static Event = Symbol('UserAuthenticatedListener');

    public log: LoggerType;

    constructor(
        @inject(Types.Core) @named(Core.Logger) Logger: typeof LoggerType
    ) {
        this.log = new Logger(__filename);
    }

    public act(user: any): void {
        this.log.info('Receive event UserAuthenticatedListener', user);
    }

}
