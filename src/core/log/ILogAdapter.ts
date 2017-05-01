export interface ILogAdapater {
    debug(message: string, ...args: any[]): void;
    info(message: string, ...args: any[]): void;
    warn(message: string, ...args: any[]): void;
    error(message: string, ...args: any[]): void;
}

export interface ILogAdapaterConstructor {
    new (scope: string): ILogAdapater;
}
