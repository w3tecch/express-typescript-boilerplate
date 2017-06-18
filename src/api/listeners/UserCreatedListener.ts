import { inject, named } from 'inversify';
import { Types } from '../../constants/Types';
import { Core } from '../../core/Targets';
import { Log } from '../../core/log/';

const log = new Log('api:listeners:UserCreated');


export class UserCreatedListener {

    static Event = Symbol('UserCreated');

    public log: Log;

    constructor(
        @inject(Types.Core) @named(Core.Log) Logger: typeof Log
    ) {
        this.log = new Logger('api:listeners:UserCreatedListener');
    }

    public run(user: any): void {
        log.info('Receive event UserCreated', user);
    }

}

