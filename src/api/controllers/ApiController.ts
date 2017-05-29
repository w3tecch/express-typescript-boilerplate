import * as express from 'express';
import * as monitor from 'express-status-monitor';
const swaggerUi = require('swagger-ui-express');
import { Controller, Get, Response, Request } from 'inversify-express-utils';
import { injectable } from 'inversify';
import { Environment } from '../../core/Environment';

/**
 * HomeController is a public controller to give some
 * information about this api
 */
@injectable()
@Controller('')
export class ApiController {

    @Get('/info')
    public getInfo( @Response() res: express.Response): any {
        const pkg = require('../../../package.json');
        return res.json({
            name: pkg.name,
            version: pkg.version,
            description: pkg.description
        });
    }

    @Get('/status')
    public getStatus( @Request() req: express.Request, @Response() res: express.Response): any {
        return monitor().pageRoute(req, res);
    }

}
