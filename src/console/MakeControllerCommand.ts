/**
 * MakeControllerCommand
 * -------------------------------------
 *
 */
import { AbstractMakeCommand } from './lib/AbstractMakeCommand';


export class MakeControllerCommand extends AbstractMakeCommand {

    static command = 'make:controller';
    static description = 'Generate new controller';

    public type = 'Controller';
    public suffix = 'Controller';
    public template = 'controller.hbs';
    public target = 'api/controllers';

}
