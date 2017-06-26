/**
 * config.Custom
 * ------------------------------------
 *
 * Define all log adapters for this application and chose one.
 */

import { Logger } from '../core/Logger';
import { App, Configurable } from '../core/App';


export class CustomConfig implements Configurable {

    private log = new Logger(__filename);

    public configure(app: App): void {
        this.log.debug('configuring', app.Express.get('port'));
    }
}

