/**
 * MakeRequestCommand
 * -------------------------------------
 *
 */
import { writeTemplate } from './lib/template';
import { askFileName, buildFilePath, existsFile, parseName } from './lib/utils';


export class MakeRequestCommand {

    static command = 'make:request';
    static description = 'Generate new request';
    static type = 'Request';
    static suffix = 'Request';
    static template = 'request.hbs';
    static target = 'api/requests';

    static async action(): Promise<void> {
        try {
            const command = new MakeRequestCommand();
            await command.run();
            process.exit(0);
        } catch (e) {
            process.exit(1);
        }
    }

    public async run(): Promise<void> {
        const context = await askFileName(MakeRequestCommand.type, MakeRequestCommand.suffix);
        const filePath = buildFilePath(MakeRequestCommand.target, context.name);
        await existsFile(filePath, true);
        await writeTemplate(MakeRequestCommand.template, filePath, {
            name: parseName(context.name, MakeRequestCommand.suffix),
            deepness: context.deepness
        });
        process.exit(0);
    }

}
