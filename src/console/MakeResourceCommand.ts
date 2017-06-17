/**
 * MakeResourceCommand
 * -------------------------------------
 *
 */
import { askFileName, askProperties, updateTargets } from './lib/utils';
import { MakeModelCommand } from './MakeModelCommand';
import { MakeRepoCommand } from './MakeRepoCommand';
import { MakeServiceCommand } from './MakeServiceCommand';
import { MakeControllerCommand } from './MakeControllerCommand';


export class MakeResourceCommand {

    static command = 'make:resource';
    static description = 'Generate a new resource';
    static type = 'Resource';
    static suffix = '';

    public context: any;
    public properties: any[];

    static async action(): Promise<void> {
        try {
            const command = new MakeResourceCommand();
            await command.run();
            await updateTargets();
        } catch (e) {
            process.exit(1);
        }
    }

    public async run(): Promise<void> {
        this.context = await askFileName(this.context, MakeResourceCommand.type, MakeResourceCommand.suffix);
        this.context.properties = await askProperties(this.context.name);

        // Get commands
        const makeModelCommand = new MakeModelCommand(this.context);
        const makeRepoCommand = new MakeRepoCommand(this.context);
        const makeServiceCommand = new MakeServiceCommand(this.context);
        const makeControllerCommand = new MakeControllerCommand(this.context);

        // Ask all meta-data
        await makeModelCommand.run();
        await makeRepoCommand.run();
        await makeServiceCommand.run();
        await makeControllerCommand.run();

        // Write all files
        await makeModelCommand.write();
        await makeRepoCommand.write();
        await makeServiceCommand.write();
        await makeControllerCommand.write();

    }

}
