/**
 * MakeMiddlewareCommand
 * -------------------------------------
 *
 */
import { writeTemplate } from './lib/template';
import { askFileName, buildFilePath, existsFile, parseName } from './lib/utils';


export class MakeMiddlewareCommand {

    static command = 'make:middleware';
    static description = 'Generate new middleware';
    static type = 'Middleware';
    static suffix = 'Middleware';
    static template = 'middleware.hbs';
    static target = 'api/middlewares';

    static async action(): Promise<void> {
        try {
            const command = new MakeMiddlewareCommand();
            await command.run();
            process.exit(0);
        } catch (e) {
            process.exit(1);
        }
    }

    public async run(): Promise<void> {
        const context = await askFileName(MakeMiddlewareCommand.type, MakeMiddlewareCommand.suffix);
        const filePath = buildFilePath(MakeMiddlewareCommand.target, context.name);
        await existsFile(filePath, true);
        await writeTemplate(MakeMiddlewareCommand.template, filePath, {
            name: parseName(context.name, MakeMiddlewareCommand.suffix),
            deepness: context.deepness
        });
        process.exit(0);
    }

}
