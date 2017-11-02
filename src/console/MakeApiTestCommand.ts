/**
 * MakeSeedCommand
 * -------------------------------------
 *
 */
import { AbstractMakeCommand } from './lib/AbstractMakeCommand';


export class MakeApiTestCommand extends AbstractMakeCommand {

    public static command = 'make:api-test';
    public static description = 'Generate new api test';

    public target = '/e2e';
    public type = 'API Test';
    public suffix = '';
    public template = 'api-test.hbs';
    public updateTargets = false;
    public isTest = true;

}
