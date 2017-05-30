import { events } from '../../core/api/events';
import { Log } from '../../core/log/';

const log = new Log('api:listeners:UserCreated');


export class UserCreatedListener {

    static Event = Symbol('UserCreated');

    public async run(user: any): Promise<void> {
        log.info('Receive event UserCreated', user);
    }

}
