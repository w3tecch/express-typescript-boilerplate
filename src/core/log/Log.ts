/**
 * core.log.Log
 * ------------------------------------------------
 *
 * This is the main Logger Object. You can create a scope logger
 * or directly use the static log methods.
 *
 * By Default it uses the debug-adapter, but you are able to change
 * this in the start up process in the core/index.ts file.
 */

import { DebugAdapter } from './DebugAdapter';


export interface LogAdapter {
    debug(message: string, ...args: any[]): void;
    info(message: string, ...args: any[]): void;
    warn(message: string, ...args: any[]): void;
    error(message: string, ...args: any[]): void;
}

export interface LogAdapterConstructor {
    new (scope: string): LogAdapter;
}

export class Log {

    public static DEFAULT_SCOPE = 'app';
    public static DefaultAdapter = DebugAdapter;

    private static Adapter: LogAdapterConstructor;
    private static Log: LogAdapter;

    private static Adapters: Map<string, LogAdapterConstructor> = new Map();

    private scope: string;
    private adapter: LogAdapter;

    public static addAdapter(key: string, adapter: LogAdapterConstructor): void {
        Log.Adapters.set(key, adapter);
    }

    public static setAdapter(key: string): void {
        const adapter = Log.Adapters.get(key);
        if (adapter !== undefined) {
            Log.Adapter = adapter;
        } else {
            Log.warn(`No log adapter with key ${key} was found!`);
        }
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
        } else {
            console.log(level, message, args);
        }
    }

    private static getLog(): LogAdapter {
        if (!Log.Log) {
            Log.Log = new Log.Adapter(Log.DEFAULT_SCOPE);
        }
        return Log.Log;
    }

    constructor(scope?: string) {
        this.scope = (scope) ? scope : Log.DEFAULT_SCOPE;
    }

    public getAdapter(): LogAdapter {
        return this.adapter;
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
        this.lazyLoadAdapter();
        this.adapter && this.adapter[level](message, args);
    }

    private lazyLoadAdapter(): void {
        if (!this.adapter) {
            if (Log.Adapter) {
                this.adapter = new Log.Adapter(this.scope);
            } else {
                this.adapter = new Log.DefaultAdapter(this.scope);
            }
        }
    }

}
