import { inject, named } from 'inversify';
import { Listener } from 'interfaces';
import { Types } from '../../../constants/Types';
import { Core } from '../../../core/Targets';
import { Logger as LoggerType } from '../../../core/Logger';


export class UserCreatedListener implements Listener {

    static Event = Symbol('UserCreated');

    public log: LoggerType;

    constructor(
        @inject(Types.Core) @named(Core.Logger) Logger: typeof LoggerType
    ) {
        this.log = new Logger(__filename);
    }

    public act(user: any): void {
        this.log.info('Receive event UserCreated', user);
    }

}

