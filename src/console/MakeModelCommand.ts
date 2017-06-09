/**
 * MakeModelCommand
 * -------------------------------------
 *
 */
import * as _ from 'lodash';
import * as path from 'path';
import * as inquirer from 'inquirer';
import { writeTemplate } from './lib/template';


export class MakeModelCommand {

    static command = 'make:model';
    static description = 'Generate new bookshelf model';

    static async action(): Promise<void> {
        try {
            await MakeModelCommand.run();
            process.exit(0);
        } catch (e) {
            process.exit(1);
        }
    }

    static async run(): Promise<void> {

        const head = await MakeModelCommand.askHead();

        let properties = [];
        if (head.hasProperties) {
            console.log('');
            console.log(`Let\'s add some ${head.name} properties now.`);
            console.log(`Enter an empty property name when done.`);
            console.log('');
            properties = await MakeModelCommand.askProperties();
        }

        console.log('');
        const filePath = path.join(__dirname, '/../api/models', `${head.name}.ts`);
        try {
            await writeTemplate('model.tpl', filePath, {
                name: head.name,
                tableName: head.tableName,
                hasTimestamps: head.hasTimestamps,
                properties: properties
            });

        } catch (err) {
            console.error(err);
            process.exit(1);
        }

        console.log('Model created in: ' + filePath);
        process.exit(0);

    }

    static async askHead(): Promise<any> {
        const headPrompt = inquirer.createPromptModule();
        return await headPrompt([
            {
                type: 'input',
                name: 'name',
                message: 'Enter the model name:',
                filter: (value: any) => _.capitalize(_.camelCase(value)),
                validate: (value: any) => !!value
            }, {
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
    }

    static async askProperties(): Promise<any[]> {
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
                property.getter = _.capitalize(property.name);
                properties.push(property);
            }
        }
        return properties;
    }

}
