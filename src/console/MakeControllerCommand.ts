/**
 * MakeControllerCommand
 * -------------------------------------
 *
 */
import { writeTemplate } from './lib/template';
import { askFileName, buildFilePath, existsFile, parseName } from './lib/utils';


export class MakeControllerCommand {

    static command = 'make:controller';
    static description = 'Generate new controller';
    static type = 'Controller';
    static suffix = 'Controller';
    static template = 'controller.hbs';
    static target = 'api/controllers';

    static async action(): Promise<void> {
        try {
            const command = new MakeControllerCommand();
            await command.run();
        } catch (e) {
            process.exit(1);
        }
    }

    public async run(): Promise<void> {
        const context = await askFileName(MakeControllerCommand.type, MakeControllerCommand.suffix);
        const filePath = buildFilePath(MakeControllerCommand.target, context.name);
        await existsFile(filePath, true);
        await writeTemplate(MakeControllerCommand.template, filePath, {
            name: parseName(context.name, MakeControllerCommand.suffix),
            deepness: context.deepness
        });
        process.exit(0);
    }

}
