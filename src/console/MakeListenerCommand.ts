/**
 * MakeListenerCommand
 * -------------------------------------
 *
 */
import { writeTemplate } from './lib/template';
import { askFileName, buildFilePath, existsFile, parseName } from './lib/utils';


export class MakeListenerCommand {

    static command = 'make:listener';
    static description = 'Generate new listener';
    static type = 'Listener';
    static suffix = 'Listener';
    static template = 'listener.hbs';
    static target = 'api/listeners';

    static async action(): Promise<void> {
        try {
            await MakeListenerCommand.run();
            process.exit(0);
        } catch (e) {
            process.exit(1);
        }
    }

    static async run(): Promise<void> {
        const context = await askFileName(MakeListenerCommand.type, MakeListenerCommand.suffix);
        const filePath = buildFilePath(MakeListenerCommand.target, context.name);
        await existsFile(filePath, true);
        await writeTemplate(MakeListenerCommand.template, filePath, {
            name: parseName(context.name, MakeListenerCommand.suffix),
            deepness: context.deepness
        });
        process.exit(0);
    }

}
