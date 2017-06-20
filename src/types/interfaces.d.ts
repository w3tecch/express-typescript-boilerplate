declare module 'interfaces' {

    import { myExpress } from 'my-express';

    interface Middleware {
        use(req: myExpress.Request, res: myExpress.Response, next: myExpress.NextFunction): void;
    }

}
