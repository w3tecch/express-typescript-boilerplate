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

import { LogAdapter } from 'interfaces';


export interface LogAdapterConstructor {
    new (scope: string): LogAdapter;
}

export class Log {

    public static DEFAULT_SCOPE = 'app';

    private static Adapter: LogAdapterConstructor;
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
            console.log(`No log adapter with key ${key} was found!`);
        }
    }

    private static parsePathToScope(path: string): string {
        if (path.indexOf('/') >= 0) {
            path = path.replace(process.cwd(), '');
            path = path.replace('/src/', '');
            path = path.replace('.ts', '');
            path = path.replace('.js', '');
            path = path.replace('/', ':');
        }
        return path;
    }

    constructor(scope?: string) {
        this.scope = Log.parsePathToScope((scope) ? scope : Log.DEFAULT_SCOPE);
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
                console.log('Please add a log adapter in the LoggerConfig!');
            }
        }
    }

}
