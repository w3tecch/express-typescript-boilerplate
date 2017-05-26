import * as express from 'express';
import { Controller, Get, Response } from 'inversify-express-utils';
import { injectable } from 'inversify';

/**
 * HomeController is a public controller to give some
 * information about this api
 */
@injectable()
@Controller('/v1')
export class HomeController {

    @Get('/')
    public get( @Response() res: express.Response): any {
        const pkg = require('../../../package.json');
        return res.json({
            name: pkg.name,
            version: pkg.version,
            description: pkg.description
        });
    }

}
