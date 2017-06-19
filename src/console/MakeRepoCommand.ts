/**
 * MakeRepoCommand
 * -------------------------------------
 *
 */
import { AbstractMakeCommand } from './lib/AbstractMakeCommand';


export class MakeRepoCommand extends AbstractMakeCommand {

    static command = 'make:repo';
    static description = 'Generate new repository';

    public type = 'Repository';
    public suffix = 'Repository';
    public template = 'repository.hbs';
    public target = 'api/repositories';

}
