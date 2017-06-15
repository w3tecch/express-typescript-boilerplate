/**
 * MakeMigrationCommand
 * -------------------------------------
 *
 */
import * as _ from 'lodash';
import * as inquirer from 'inquirer';
import { writeTemplate } from './lib/template';
import { inputIsRequired, buildFilePath, existsFile } from './lib/utils';

export class MakeMigrationCommand {

    static command = 'make:migration';
    static description = 'Generate new migration';
    static target = 'database/migrations';
    static type = 'Migration';
    static suffix = '';
    static template = 'migration.hbs';

    static async action(): Promise<void> {
        try {
            const command = new MakeMigrationCommand();
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
                message: `Enter the name of the ${MakeMigrationCommand.type}:`,
                filter: v => _.snakeCase(v),
                validate: inputIsRequired
            }
        ]);
        const name = `${(new Date()).getTime()}_${prompts.name}`;
        const filePath = buildFilePath(MakeMigrationCommand.target, name);
        await existsFile(filePath, true);
        await writeTemplate(MakeMigrationCommand.template, filePath, {});
        process.exit(0);
    }

}
