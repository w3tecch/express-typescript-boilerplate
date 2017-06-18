import * as fs from 'fs';
import * as _ from 'lodash';
import * as path from 'path';
import * as inquirer from 'inquirer';
import * as pluralize from 'pluralize';
import { UpdateTargetsCommand } from '../UpdateTargetsCommand';


export const parseName = (name: string, suffix: string) => ({
    camelCase: _.camelCase(removeSufix(suffix, name)),
    snakeCase: _.snakeCase(removeSufix(suffix, name)),
    capitalize: _.upperFirst(_.camelCase(removeSufix(suffix, name))),
    lowerCase: _.lowerCase(removeSufix(suffix, name)),
    kebabCase: _.kebabCase(removeSufix(suffix, name)),
    pluralize: pluralize(_.kebabCase(removeSufix(suffix, name))),
    normal: name
});

export const removeSufix = (suffix: string, value: string) => {
    return value.replace(suffix, '');
};

export const filterInput = (suffix: string, prefix = '') => (value: string) => {
    let vs = value.split('/');
    vs = vs.map((v) => _.camelCase(v));
    vs[vs.length - 1] = _.capitalize(vs[vs.length - 1]);
    return (vs.join('/')) + prefix + suffix;
};

export const buildFilePath = (targetPath: string, fileName: string, extension = '.ts') =>
    path.join(__dirname, `/../../${targetPath}`, `${fileName}${extension}`);

export const inputIsRequired = (value: any) => !!value;

export const askFileName = async (context: any, name: string, suffix: string, prefix: string) => {
    if (context === undefined || context.name === undefined) {
        const prompt = inquirer.createPromptModule();
        context = await prompt([
            {
                type: 'input',
                name: 'name',
                message: `Enter the name of the ${name}:`,
                filter: filterInput(suffix, prefix),
                validate: inputIsRequired
            }
        ]);
        const amount = context.name.split('/').length - 1;
        context.deepness = '';
        _.times(amount, () => context.deepness += '../');
    } else {
        context.name = filterInput(suffix, prefix)(context.name);
    }
    return context;
};

export const existsFile = async (path: string, stop: boolean = false) => {
    const prompt = inquirer.createPromptModule();
    return new Promise((resolve, reject) => {
        fs.exists(path, async (exists) => {

            if (exists) {
                const fileName = path.split('/src/')[1];
                const answer = await prompt([
                    {
                        type: 'confirm',
                        name: 'override',
                        message: `Override "src/${fileName}"?`,
                        default: true
                    }
                ]);
                if (answer.override) {
                    return resolve(exists);
                }
            } else {
                return resolve(exists);
            }

            if (stop) {
                process.exit(0);
            }
            reject();
        });
    });
};

export const updateTargets = async () => {
    console.log('');
    const prompt = inquirer.createPromptModule();
    const answer = await prompt([
        {
            type: 'confirm',
            name: 'generateTargets',
            message: 'Update IoC targets?',
            default: true
        }
    ]);
    if (answer.generateTargets === true) {
        const command = new UpdateTargetsCommand();
        await command.run();
    }
};

export const askProperties = async (name: string): Promise<any[]> => {
    console.log('');
    console.log(`Let\'s add some ${name} properties now.`);
    console.log(`Enter an empty property name when done.`);
    console.log('');

    let askAgain = true;
    const fieldPrompt = inquirer.createPromptModule();
    const properties: any[] = [];
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
                    'string (string)',
                    'text (string)',

                    'boolean (boolean)',

                    'integer (number)',
                    'bigInteger (number)',
                    'float (number)',
                    'decimal (number)',
                    'binary (number)',

                    'date (Date)',
                    'time (Date)',
                    'dateTime (Date)'
                ]
            }
        ]);
        if (askAgain) {
            console.log('');
            property.name = parseName(property.name, '');
            properties.push(property);
        }
    }
    properties.map(p => {
        const types = p.type.replace(/[()]/g, '').split(' ');
        p.type = {
            script: types[1],
            database: types[0]
        };
        return p;
    });
    console.log('');
    return properties;
};
