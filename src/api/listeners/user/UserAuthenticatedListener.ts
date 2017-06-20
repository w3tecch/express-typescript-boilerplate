import { inject, named } from 'inversify';
import { Listener } from 'interfaces';
import { Types } from '../../../constants/Types';
import { Core } from '../../../core/Targets';
import { Log } from '../../../core/Log';


export class UserAuthenticatedListener implements Listener {

    static Event = Symbol('UserAuthenticatedListener');

    public log: Log;

    constructor(
        @inject(Types.Core) @named(Core.Log) Logger: typeof Log
    ) {
        this.log = new Logger('api:listeners:UserAuthenticatedListener');
    }

    public act(user: any): void {
        this.log.info('Receive event UserAuthenticatedListener', user);
    }

}
