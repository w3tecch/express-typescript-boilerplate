/**
 * MakeExceptionCommand
 * -------------------------------------
 *
 */
import { writeTemplate } from './lib/template';
import { askFileName, buildFilePath, existsFile, parseName } from './lib/utils';


export class MakeExceptionCommand {

    static command = 'make:exception';
    static description = 'Generate new exception';
    static type = 'Exception';
    static suffix = 'Exception';
    static template = 'exception.hbs';
    static target = 'api/exceptions';

    static async action(): Promise<void> {
        try {
            await MakeExceptionCommand.run();
            process.exit(0);
        } catch (e) {
            process.exit(1);
        }
    }

    static async run(): Promise<void> {
        const context = await askFileName(MakeExceptionCommand.type, MakeExceptionCommand.suffix);
        const filePath = buildFilePath(MakeExceptionCommand.target, context.name);
        await existsFile(filePath, true);
        await writeTemplate(MakeExceptionCommand.template, filePath, {
            name: parseName(context.name, MakeExceptionCommand.suffix),
            deepness: context.deepness
        });
        process.exit(0);
    }

}
