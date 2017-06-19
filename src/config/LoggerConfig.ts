/**
 * config.Logger
 * ------------------------------------
 *
 * Define all log adapters for this application and chose one.
 */

import { Log, WinstonAdapter, DebugAdapter } from '../core/log';
import { Configurable } from '../core/App';


export class LoggerConfig implements Configurable {
    public configure(): void {
        Log.addAdapter('winston', WinstonAdapter);
        Log.addAdapter('debug', DebugAdapter);
        Log.setAdapter(process.env.LOG_ADAPTER);
    }
}

