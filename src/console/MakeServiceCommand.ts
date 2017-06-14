/**
 * MakeServiceCommand
 * -------------------------------------
 *
 */
import { writeTemplate } from './lib/template';
import { askFileName, buildFilePath, existsFile, parseName } from './lib/utils';


export class MakeServiceCommand {

    static command = 'make:service';
    static description = 'Generate new service';
    static type = 'Service';
    static suffix = 'Service';
    static template = 'service.hbs';
    static target = 'api/services';

    static async action(): Promise<void> {
        try {
            await MakeServiceCommand.run();
            process.exit(0);
        } catch (e) {
            process.exit(1);
        }
    }

    static async run(): Promise<void> {
        const context = await askFileName(MakeServiceCommand.type, MakeServiceCommand.suffix);
        const filePath = buildFilePath(MakeServiceCommand.target, context.name);
        await existsFile(filePath, true);
        await writeTemplate(MakeServiceCommand.template, filePath, {
            name: parseName(context.name, MakeServiceCommand.suffix),
            deepness: context.deepness
        });
        process.exit(0);
    }

}
