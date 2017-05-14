import * as express from 'express';
import { Controller, Get, Response } from 'inversify-express-utils';
import { injectable } from 'inversify';

@injectable()
@Controller('/')
export class HomeController {

    @Get('/')
    public get(@Response() res: express.Response): any {
        const pkg = require('../../../package.json');
        return res.json({
            name: pkg.name,
            version: pkg.version,
            description: pkg.description
        });
    }

}
