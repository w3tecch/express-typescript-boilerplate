/**
 * MakeMiddlewareCommand
 * -------------------------------------
 *
 */
import { AbstractMakeCommand } from './lib/AbstractMakeCommand';


export class MakeMiddlewareCommand extends AbstractMakeCommand {

    static command = 'make:middleware';
    static description = 'Generate new middleware';

    public type = 'Middleware';
    public suffix = 'Middleware';
    public template = 'middleware.hbs';
    public target = 'api/middlewares';

}
