/**
 * MakeSeedCommand
 * -------------------------------------
 *
 */
import * as _ from 'lodash';
import { AbstractMakeCommand } from './lib/AbstractMakeCommand';

export class MakeSeedCommand extends AbstractMakeCommand {

    public static command = 'make:seed';
    public static description = 'Generate new seed';

    public target = 'database/seeds';
    public type = 'Seed';
    public suffix = '';
    public template = 'seed.hbs';
    public updateTargets = false;

    public parseName(suffix: string = '', prefix: string = ''): (name: string) => string {
        return (name: string) => {
            return _.snakeCase(name);
        };
    }

}
