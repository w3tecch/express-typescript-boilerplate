/**
 * MakeValidatorCommand
 * -------------------------------------
 *
 */
import { AbstractMakeCommand } from './lib/AbstractMakeCommand';


export class MakeValidatorCommand extends AbstractMakeCommand {

    public static command = 'make:validator';
    public static description = 'Generate new validator';

    public type = 'Validator';
    public suffix = 'Validator';
    public template = 'validator.hbs';
    public target = 'api/validators';
    public updateTargets = false;

}
