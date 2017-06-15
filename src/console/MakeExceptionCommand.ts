/**
 * MakeExceptionCommand
 * -------------------------------------
 *
 */
import { writeTemplate } from './lib/template';
import { askFileName, buildFilePath, existsFile, parseName, updateTargets } from './lib/utils';


export class MakeExceptionCommand {

    static command = 'make:exception';
    static description = 'Generate new exception';
    static type = 'Exception';
    static suffix = 'Exception';
    static template = 'exception.hbs';
    static target = 'api/exceptions';

    static async action(): Promise<void> {
        try {
            const command = new MakeExceptionCommand();
            await command.run();
            process.exit(0);
        } catch (e) {
            process.exit(1);
        }
    }

    public async run(): Promise<void> {
        const context = await askFileName(MakeExceptionCommand.type, MakeExceptionCommand.suffix);
        const filePath = buildFilePath(MakeExceptionCommand.target, context.name);
        await existsFile(filePath, true);
        await writeTemplate(MakeExceptionCommand.template, filePath, {
            name: parseName(context.name, MakeExceptionCommand.suffix),
            deepness: context.deepness
        });
        await updateTargets();
        process.exit(0);
    }

}
