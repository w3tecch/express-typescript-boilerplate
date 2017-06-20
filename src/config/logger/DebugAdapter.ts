/**
 * core.log.DebugAdapter
 * ------------------------------------------------
 *
 * This adapter uses the debug module to print all logs
 * to the terminal.
 *
 * It also is used by a lot of our third-party-libs, so
 * just change the scope in the .env file and you are
 * able to see more debug logs.
 */

import * as Debug from 'debug';
import { LogAdapter } from 'interfaces';


export class DebugAdapter implements LogAdapter {

    private logger: Debug.IDebugger;

    constructor(scope: string) {
        this.logger = Debug(scope);
    }

    public debug(message: string, ...args: any[]): void {
        this.logger(message, this.parseArgs(args));
    }

    public info(message: string, ...args: any[]): void {
        this.logger('ℹ ' + message, this.parseArgs(args));
    }

    public warn(message: string, ...args: any[]): void {
        this.logger('❗ ' + message, this.parseArgs(args));
    }

    public error(message: string, ...args: any[]): void {
        this.logger('❌ ' + message, this.parseArgs(args));
    }

    private parseArgs(args: any[]): any {
        return (args && args[0] && args[0].length > 0) ? args : '';
    }

}
