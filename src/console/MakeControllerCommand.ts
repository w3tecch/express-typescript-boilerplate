/**
 * MakeControllerCommand
 * -------------------------------------
 *
 */
import { AbstractMakeCommand } from './lib/AbstractMakeCommand';


export class MakeControllerCommand extends AbstractMakeCommand {

    public static command = 'make:controller';
    public static description = 'Generate new controller';

    public type = 'Controller';
    public suffix = 'Controller';
    public template = 'controller.hbs';
    public target = 'api/controllers';

}
