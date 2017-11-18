import { Request, Response } from 'express';

/**
 * Just dummy routes as example how configuration can be separated from business logic.
 * Try routing-controllers library if you want to have structured routes in your application.
 */
export const Routes = {
    '/': (req: Request, res: Response) => {
        res.send('Hello World');
    },
    '/posts': (req: Request, res: Response) => {
        res.send('Hello posts');
    },
    '/users': (req: Request, res: Response) => {
        res.send('Hello users');
    }
};
