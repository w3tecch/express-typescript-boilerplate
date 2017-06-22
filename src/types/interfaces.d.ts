declare namespace interfaces {

    interface Middleware {
        use(req: myExpress.Request, res: myExpress.Response, next: myExpress.NextFunction): void;
    }

    interface Listener {
        act<T>(value?: T): void;
        act(...args: any[]): void;
    }

    interface Configurable {
        configure<T>(instance: T): void;
    }

    interface LoggerAdapter {
        debug(message: string, ...args: any[]): void;
        info(message: string, ...args: any[]): void;
        warn(message: string, ...args: any[]): void;
        error(message: string, ...args: any[]): void;
    }

    interface LoggerAdapterConstructor {
        new (scope: string): LoggerAdapter;
    }

}

export as namespace interfaces;
export = interfaces;
