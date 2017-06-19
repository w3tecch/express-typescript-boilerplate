/**
 * MakeServiceCommand
 * -------------------------------------
 *
 */
import { AbstractMakeCommand } from './lib/AbstractMakeCommand';


export class MakeServiceCommand extends AbstractMakeCommand {

    static command = 'make:service';
    static description = 'Generate new service';

    public type = 'Service';
    public suffix = 'Service';
    public template = 'service.hbs';
    public target = 'api/services';

}
