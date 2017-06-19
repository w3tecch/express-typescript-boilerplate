/**
 * config.Custom
 * ------------------------------------
 *
 * Define all log adapters for this application and chose one.
 */

import { Log } from '../core/log';
import { App, Configurable } from '../core/App';


export class CustomConfig implements Configurable {

    private log = new Log('config:CustomConfig');

    public configure(app: App): void {
        this.log.debug('configuring', app.Express.get('port'));
    }
}

