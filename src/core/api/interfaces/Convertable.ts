import * as express from 'express';


export interface Convertable {
    convert<T>(body: T, res: express.Response): Promise<T>;
}
