/**
 * MakeResourceCommand
 * -------------------------------------
 *
 */
import { askProperties } from './lib/utils';
import { AbstractMakeCommand } from './lib/AbstractMakeCommand';
import { MakeModelCommand } from './MakeModelCommand';
import { MakeRepoCommand } from './MakeRepoCommand';
import { MakeServiceCommand } from './MakeServiceCommand';
import { MakeControllerCommand } from './MakeControllerCommand';
import { MakeRequestCommand } from './MakeRequestCommand';
import { MakeApiTestCommand } from './MakeApiTestCommand';


export class MakeResourceCommand extends AbstractMakeCommand {

    public static command = 'make:resource';
    public static description = 'Generate a new resource';

    public type = 'Resource';
    public suffix = '';
    public prefix = '';
    public context: any;
    public properties: any[];

    public makeModelCommand: AbstractMakeCommand;
    public makeRepoCommand: AbstractMakeCommand;
    public makeServiceCommand: AbstractMakeCommand;
    public makeControllerCommand: AbstractMakeCommand;
    public makeCreateRequestCommand: MakeRequestCommand;
    public makeUpdateRequestCommand: MakeRequestCommand;
    public makeApiTestCommand: MakeApiTestCommand;

    public async run(): Promise<void> {
        this.context = await this.askFileName(this.context, this.type, this.suffix, this.prefix);
        this.context.properties = await askProperties(this.context.name);
        this.context.hasProperties = true;
        this.context.isResourceTemplate = true;

        // Get commands
        this.makeModelCommand = new MakeModelCommand(this.context);
        this.makeRepoCommand = new MakeRepoCommand(this.context);
        this.makeServiceCommand = new MakeServiceCommand(this.context);
        this.makeControllerCommand = new MakeControllerCommand(this.context);
        this.makeCreateRequestCommand = new MakeRequestCommand(this.context, 'Create');
        this.makeUpdateRequestCommand = new MakeRequestCommand(this.context, 'Update');
        this.makeApiTestCommand = new MakeApiTestCommand(this.context);

        // Ask all meta-data
        await this.makeModelCommand.run();
        await this.makeRepoCommand.run();
        await this.makeServiceCommand.run();
        await this.makeControllerCommand.run();
        await this.makeCreateRequestCommand.run();
        await this.makeUpdateRequestCommand.run();
        await this.makeApiTestCommand.run();
    }

    public async write(): Promise<void> {
        await this.makeModelCommand.write();
        await this.makeRepoCommand.write();
        await this.makeServiceCommand.write();
        await this.makeControllerCommand.write();
        await this.makeCreateRequestCommand.write();
        await this.makeUpdateRequestCommand.write();
        await this.makeApiTestCommand.write();
    }

}
