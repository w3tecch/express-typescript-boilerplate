/**
 * MakeRepoCommand
 * -------------------------------------
 *
 */
import { AbstractMakeCommand } from './lib/AbstractMakeCommand';


export class MakeRepoCommand extends AbstractMakeCommand {

    public static command = 'make:repo';
    public static description = 'Generate new repository';

    public type = 'Repository';
    public suffix = 'Repository';
    public template = 'repository.hbs';
    public target = 'api/repositories';

}
