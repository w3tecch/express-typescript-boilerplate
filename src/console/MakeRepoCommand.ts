/**
 * MakeRepoCommand
 * -------------------------------------
 *
 */
import { writeTemplate } from './lib/template';
import { askFileName, buildFilePath, existsFile, parseName } from './lib/utils';


export class MakeRepoCommand {

    static command = 'make:repo';
    static description = 'Generate new repository';
    static type = 'Repository';
    static suffix = 'Repository';
    static template = 'repository.hbs';
    static target = 'api/repositories';

    static async action(): Promise<void> {
        try {
            await MakeRepoCommand.run();
            process.exit(0);
        } catch (e) {
            process.exit(1);
        }
    }

    static async run(): Promise<void> {
        const context = await askFileName(MakeRepoCommand.type, MakeRepoCommand.suffix);
        const filePath = buildFilePath(MakeRepoCommand.target, context.name);
        await existsFile(filePath, true);
        await writeTemplate(MakeRepoCommand.template, filePath, {
            name: parseName(context.name, MakeRepoCommand.suffix),
            deepness: context.deepness
        });
        process.exit(0);
    }

}

