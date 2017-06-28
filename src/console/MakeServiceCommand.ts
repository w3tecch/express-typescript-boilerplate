/**
 * MakeServiceCommand
 * -------------------------------------
 *
 */
import { AbstractMakeCommand } from './lib/AbstractMakeCommand';


export class MakeServiceCommand extends AbstractMakeCommand {

    public static command = 'make:service';
    public static description = 'Generate new service';

    public type = 'Service';
    public suffix = 'Service';
    public template = 'service.hbs';
    public target = 'api/services';

}
