/**
 * MakeListenerCommand
 * -------------------------------------
 *
 */
import { AbstractMakeCommand } from './lib/AbstractMakeCommand';


export class MakeListenerCommand extends AbstractMakeCommand {

    public static command = 'make:listener';
    public static description = 'Generate new listener';

    public type = 'Listener';
    public suffix = 'Listener';
    public template = 'listener.hbs';
    public target = 'api/listeners';

}
