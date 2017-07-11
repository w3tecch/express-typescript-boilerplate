/**
 * MakeSeedCommand
 * -------------------------------------
 *
 */
import { AbstractMakeCommand } from './lib/AbstractMakeCommand';


export class MakeApiTestCommand extends AbstractMakeCommand {

    public static command = 'make:api-test';
    public static description = 'Generate new api test';

    public target = '/black-box';
    public type = 'API Test';
    public suffix = '';
    public template = 'api-test.hbs';
    public updateTargets = false;
    public isTest = true;

}
