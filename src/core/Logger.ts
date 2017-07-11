import { getFolderWrapping, isWindows } from './helpers/Path';

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

export class Logger {

    public static DEFAULT_SCOPE = 'app';

    public static addAdapter(key: string, adapter: interfaces.LoggerAdapterConstructor): void {
        Logger.Adapters.set(key, adapter);
    }

    public static setAdapter(key: string): void {
        const adapter = Logger.Adapters.get(key);
        if (adapter !== undefined) {
            Logger.Adapter = adapter;
        } else {
            console.log(`No log adapter with key ${key} was found!`);
        }
    }

    private static Adapter: interfaces.LoggerAdapterConstructor;
    private static Adapters: Map<string, interfaces.LoggerAdapterConstructor> = new Map();

    private static parsePathToScope(path: string): string {
        const pathDelimiter = isWindows() ? '\\' : '/';
        if (path.indexOf(pathDelimiter) >= 0) {
            path = path.replace(process.cwd(), '');
            path = path.replace(getFolderWrapping('src'), '');
            path = path.replace(getFolderWrapping('dist'), '');
            path = path.replace('.ts', '');
            path = path.replace('.js', '');
            path = path.replace(/\//g, ':');
        }
        return path;
    }

    private scope: string;
    private adapter: interfaces.LoggerAdapter;

    constructor(scope?: string) {
        this.scope = Logger.parsePathToScope((scope) ? scope : Logger.DEFAULT_SCOPE);
    }

    public getAdapter(): interfaces.LoggerAdapter {
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
        if (this.adapter) {
            this.adapter[level](message, args);
        }
    }

    private lazyLoadAdapter(): void {
        if (!this.adapter) {
            if (Logger.Adapter) {
                this.adapter = new Logger.Adapter(this.scope);
            } else {
                console.log('Please add a log adapter in the LoggerConfig!');
            }
        }
    }

}
