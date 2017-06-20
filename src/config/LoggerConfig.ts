/**
 * config.Logger
 * ------------------------------------
 *
 * Define all log adapters for this application and chose one.
 */

import { Log } from '../core/Log';
import { WinstonAdapter } from './logger/WinstonAdapter';
import { Configurable } from '../core/App';


export class LoggerConfig implements Configurable {
    public configure(): void {
        Log.addAdapter('winston', WinstonAdapter);
        Log.setAdapter(process.env.LOG_ADAPTER);
    }
}
