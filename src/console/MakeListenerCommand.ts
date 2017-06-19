/**
 * MakeListenerCommand
 * -------------------------------------
 *
 */
import { AbstractMakeCommand } from './lib/AbstractMakeCommand';


export class MakeListenerCommand extends AbstractMakeCommand {

    static command = 'make:listener';
    static description = 'Generate new listener';

    public type = 'Listener';
    public suffix = 'Listener';
    public template = 'listener.hbs';
    public target = 'api/listeners';

}
