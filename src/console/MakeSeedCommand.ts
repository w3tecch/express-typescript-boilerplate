/**
 * MakeSeedCommand
 * -------------------------------------
 *
 */
import { AbstractMakeCommand } from './lib/AbstractMakeCommand';


export class MakeSeedCommand extends AbstractMakeCommand {

    static command = 'make:seed';
    static description = 'Generate new seed';

    public target = 'database/seeds';
    public type = 'Seed';
    public suffix = '';
    public template = 'seed.hbs';
    public updateTargets = false;

}
