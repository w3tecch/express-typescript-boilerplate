/**
 * MakeRequestCommand
 * -------------------------------------
 *
 */
import { AbstractMakeCommand } from './AbstractMakeCommand';


export class MakeRequestCommand extends AbstractMakeCommand {

    static command = 'make:request';
    static description = 'Generate new request';

    public type = 'Request';
    public suffix = 'Request';
    public template = 'request.hbs';
    public target = 'api/requests';

}
