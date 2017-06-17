/**
 * MakeResourceCommand
 * -------------------------------------
 *
 */
import { askFileName, askProperties } from './lib/utils';
import { AbstractMakeCommand } from './AbstractMakeCommand';
import { MakeModelCommand } from './MakeModelCommand';
import { MakeRepoCommand } from './MakeRepoCommand';
import { MakeServiceCommand } from './MakeServiceCommand';
import { MakeControllerCommand } from './MakeControllerCommand';


export class MakeResourceCommand extends AbstractMakeCommand {

    static command = 'make:resource';
    static description = 'Generate a new resource';

    public type = 'Resource';
    public suffix = '';
    public context: any;
    public properties: any[];

    public makeModelCommand: AbstractMakeCommand;
    public makeRepoCommand: AbstractMakeCommand;
    public makeServiceCommand: AbstractMakeCommand;
    public makeControllerCommand: AbstractMakeCommand;

    public async run(): Promise<void> {
        this.context = await askFileName(this.context, this.type, this.suffix);
        this.context.properties = await askProperties(this.context.name);
        this.context.hasProperties = true;

        // Get commands
        this.makeModelCommand = new MakeModelCommand(this.context);
        this.makeRepoCommand = new MakeRepoCommand(this.context);
        this.makeServiceCommand = new MakeServiceCommand(this.context);
        this.makeControllerCommand = new MakeControllerCommand(this.context);

        // Ask all meta-data
        await this.makeModelCommand.run();
        await this.makeRepoCommand.run();
        await this.makeServiceCommand.run();
        await this.makeControllerCommand.run();
    }

    public async write(): Promise<void> {
        await this.makeModelCommand.write();
        await this.makeRepoCommand.write();
        await this.makeServiceCommand.write();
        await this.makeControllerCommand.write();
    }

}
