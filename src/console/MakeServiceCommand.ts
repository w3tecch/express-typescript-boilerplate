/**
 * MakeServiceCommand
 * -------------------------------------
 *
 */
import { writeTemplate } from './lib/template';
import { askFileName, buildFilePath, existsFile, parseName, updateTargets } from './lib/utils';


export class MakeServiceCommand {

    static command = 'make:service';
    static description = 'Generate new service';
    static type = 'Service';
    static suffix = 'Service';
    static template = 'service.hbs';
    static target = 'api/services';

    static async action(): Promise<void> {
        try {
            const command = new MakeServiceCommand();
            await command.run();
            process.exit(0);
        } catch (e) {
            process.exit(1);
        }
    }

    public async run(): Promise<void> {
        const context = await askFileName(MakeServiceCommand.type, MakeServiceCommand.suffix);
        const filePath = buildFilePath(MakeServiceCommand.target, context.name);
        await existsFile(filePath, true);
        await writeTemplate(MakeServiceCommand.template, filePath, {
            name: parseName(context.name, MakeServiceCommand.suffix),
            deepness: context.deepness
        });
        await updateTargets();
        process.exit(0);
    }

}
