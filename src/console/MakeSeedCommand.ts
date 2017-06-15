/**
 * MakeSeedCommand
 * -------------------------------------
 *
 */
import * as _ from 'lodash';
import * as inquirer from 'inquirer';
import { writeTemplate } from './lib/template';
import { inputIsRequired, buildFilePath, existsFile } from './lib/utils';

export class MakeSeedCommand {

    static command = 'make:seed';
    static description = 'Generate new seed';
    static target = 'database/seeds';
    static type = 'Seed';
    static suffix = '';
    static template = 'seed.hbs';

    static async action(): Promise<void> {
        try {
            const command = new MakeSeedCommand();
            await command.run();
        } catch (e) {
            process.exit(1);
        }
    }

    public async run(): Promise<void> {
        const prompt = inquirer.createPromptModule();
        const prompts = await prompt([
            {
                type: 'input',
                name: 'name',
                message: `Enter the name of the ${MakeSeedCommand.type}:`,
                filter: v => _.snakeCase(v),
                validate: inputIsRequired
            }
        ]);
        const filePath = buildFilePath(MakeSeedCommand.target, prompts.name);
        await existsFile(filePath, true);
        await writeTemplate(MakeSeedCommand.template, filePath, {});
        process.exit(0);
    }

}
