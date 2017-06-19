/**
 * MakeExceptionCommand
 * -------------------------------------
 *
 */
import { AbstractMakeCommand } from './lib/AbstractMakeCommand';


export class MakeExceptionCommand extends AbstractMakeCommand {

    static command = 'make:exception';
    static description = 'Generate new exception';

    public type = 'Exception';
    public suffix = 'Exception';
    public template = 'exception.hbs';
    public target = 'api/exceptions';

}
