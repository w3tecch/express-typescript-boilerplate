/**
 * config.Logger
 * ------------------------------------
 *
 * Define all log adapters for this application and chose one.
 */

import { Logger } from '../core/Logger';
import { WinstonAdapter } from './logger/WinstonAdapter';
import { Configurable } from '../core/App';


export class LoggerConfig implements Configurable {
    public configure(): void {
        Logger.addAdapter('winston', WinstonAdapter);
        Logger.setAdapter(process.env.LOG_ADAPTER);
    }
}
