/**
 * MakeModelCommand
 * -------------------------------------
 *
 */
import * as _ from 'lodash';
import * as inquirer from 'inquirer';
import { writeTemplate } from './lib/template';
import { askFileName, buildFilePath, existsFile, parseName, updateTargets } from './lib/utils';


export class MakeModelCommand {

    static command = 'make:model';
    static description = 'Generate new model';
    static type = 'Model';
    static suffix = '';
    static template = 'model.hbs';
    static target = 'api/models';

    static async action(): Promise<void> {
        try {
            const command = new MakeModelCommand();
            await command.run();
            process.exit(0);
        } catch (e) {
            process.exit(1);
        }
    }

    public async run(): Promise<void> {
        const fileName = await askFileName(MakeModelCommand.type, MakeModelCommand.suffix);
        const context = await this.askMetaData(fileName);
        const properties = await this.askProperties(context);
        const filePath = buildFilePath(MakeModelCommand.target, context.name);
        await existsFile(filePath, true);
        await writeTemplate(MakeModelCommand.template, filePath, {
            name: parseName(context.name, MakeModelCommand.suffix),
            tableName: context.tableName,
            hasTimestamps: context.hasTimestamps,
            properties: properties,
            deepness: context.deepness
        });
        await updateTargets();
        process.exit(0);
    }

    private async askMetaData(context: any): Promise<any> {
        const prompt = inquirer.createPromptModule();
        const prompts = await prompt([
            {
                type: 'input',
                name: 'tableName',
                message: 'Add the database table:',
                filter: (value: any) => _.snakeCase(value),
                validate: (value: any) => !!value
            }, {
                type: 'confirm',
                name: 'hasTimestamps',
                message: 'Has timestamps?',
                default: true
            }, {
                type: 'confirm',
                name: 'hasProperties',
                message: 'Do you want to add some properties?',
                default: true
            }
        ]);
        return _.assign(context, prompts);
    }

    private async askProperties(head: any): Promise<any[]> {
        if (!head.hasProperties) {
            return;
        }

        console.log('');
        console.log(`Let\'s add some ${head.name} properties now.`);
        console.log(`Enter an empty property name when done.`);
        console.log('');

        let askAgain = true;
        const fieldPrompt = inquirer.createPromptModule();
        const properties = [];
        while (askAgain) {
            const property = await fieldPrompt([
                {
                    type: 'input',
                    name: 'name',
                    message: 'Property name:',
                    filter: (value: any) => _.camelCase(value)
                }, {
                    type: 'list',
                    name: 'type',
                    message: 'Property type:',
                    when: (res: any) => {
                        askAgain = !!res['name'];
                        return askAgain;
                    },
                    choices: [
                        'string',
                        'number',
                        'boolean',
                        'Date',
                        'any'
                    ]
                }
            ]);
            if (askAgain) {
                console.log('');
                property.name = parseName(property.name, '');
                properties.push(property);
            }
        }
        return properties;
    }

}
