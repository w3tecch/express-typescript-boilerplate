import * as Debug from 'debug';
import { ILogAdapter } from './ILogAdapter';


export class DebugAdapter implements ILogAdapter {

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
