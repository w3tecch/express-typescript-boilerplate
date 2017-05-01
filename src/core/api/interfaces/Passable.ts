import * as express from 'express-extended';


export interface Passable {
    pass(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void>;
}
