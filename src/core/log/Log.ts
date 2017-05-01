import { ILogAdapater, ILogAdapaterConstructor } from './ILogAdapter';
import { DebugAdapter } from './DebugAdapter';


export class Log {

    public static DEFAULT_SCOPE = 'app';
    public static DefaultAdapter = DebugAdapter;

    private static Adapter: ILogAdapaterConstructor;
    private static Log: ILogAdapater;

    private scope: string;
    private adapter: ILogAdapater;

    public static setAdapter(adapter: ILogAdapaterConstructor): void {
        Log.Adapter = adapter;
    }

    public static debug(message: string, ...args: any[]): void {
        Log.log('debug', message, args);
    }

    public static info(message: string, ...args: any[]): void {
        Log.log('info', message, args);
    }

    public static warn(message: string, ...args: any[]): void {
        Log.log('warn', message, args);
    }

    public static error(message: string, ...args: any[]): void {
        Log.log('error', message, args);
    }

    public static log(level: string, message: string, args: any[]): void {
        if (Log.Adapter) {
            const log = Log.getLog();
            log[level](message, args);
        }
    }

    private static getLog(): ILogAdapater {
        if (!Log.Log) {
            Log.Log = new Log.Adapter(Log.DEFAULT_SCOPE);
        }
        return Log.Log;
    }

    constructor(scope?: string) {
        this.scope = (scope) ? scope : Log.DEFAULT_SCOPE;
    }

    public debug(message: string, ...args: any[]): void {
        this.log('debug', message, args);
    }

    public info(message: string, ...args: any[]): void {
        this.log('info', message, args);
    }

    public warn(message: string, ...args: any[]): void {
        this.log('warn', message, args);
    }

    public error(message: string, ...args: any[]): void {
        this.log('error', message, args);
    }

    private log(level: string, message: string, args: any[]): void {
        this.lazyLoadAdpater();
        this.adapter && this.adapter[level](message, args);
    }

    private lazyLoadAdpater(): void {
        if (!this.adapter) {
            if (Log.Adapter) {
                this.adapter = new Log.Adapter(this.scope);
            } else {
                this.adapter = new Log.DefaultAdapter(this.scope);
            }
        }
    }

}
