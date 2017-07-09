/**
 * MakeModelCommand
 * -------------------------------------
 *
 */
import * as _ from 'lodash';
import * as inquirer from 'inquirer';
import { AbstractMakeCommand } from './lib/AbstractMakeCommand';
import { MakeMigrationCommand } from './MakeMigrationCommand';
import { askProperties, buildFilePath, existsFile } from './lib/utils';
import { writeTemplate } from './lib/template';


export class MakeModelCommand extends AbstractMakeCommand {

    public static command = 'make:model';
    public static description = 'Generate new model';

    public type = 'Model';
    public suffix = '';
    public template = 'model.hbs';
    public target = 'api/models';
    public makeMigrationCommand: MakeMigrationCommand;

    public async run(): Promise<void> {
        await super.run();
        const metaData = await this.askMetaData(this.context);
        this.context = { ...(this.context || {}), ...metaData };

        if (this.context.hasProperties && !this.context.properties) {
            this.context.properties = await askProperties(this.context);
        }

        if (this.context.hasMigration) {
            this.makeMigrationCommand = new MakeMigrationCommand(this.context);
            await this.makeMigrationCommand.run();
        }
    }

    public async write(): Promise<void> {
        // Create migration file
        if (this.context.hasMigration) {
            await this.makeMigrationCommand.write();
        }

        // Create model
        await super.write();

        // Create interface for this resource object
        const filePath = buildFilePath('types/resources', this.context.name.camelCase, false, '.d.ts');
        await existsFile(filePath, true);
        await writeTemplate('resource.hbs', filePath, this.context);
    }

    private async askMetaData(context: any): Promise<any> {
        const prompt = inquirer.createPromptModule();
        const prompts = await prompt([
            {
                type: 'input',
                name: 'tableName',
                message: 'Enter the table-name:',
                filter: (value: any) => _.snakeCase(value),
                validate: (value: any) => !!value
            }, {
                type: 'confirm',
                name: 'hasTimestamps',
                message: 'Has timestamps?',
                default: true
            }, {
                type: 'confirm',
                name: 'hasMigration',
                message: 'Add migration?',
                default: true
            }, {
                type: 'confirm',
                name: 'hasProperties',
                message: 'Do you want to add some properties?',
                default: true,
                when: () => !this.context.properties
            }
        ]);
        return _.assign(context, prompts);
    }

}
