import * as fs from 'fs';
import * as _ from 'lodash';
import * as path from 'path';
import * as inquirer from 'inquirer';


export const parseName = (name: string, suffix: string) => ({
    camelCase: _.camelCase(removeSufix(suffix, name)),
    snakeCase: _.snakeCase(removeSufix(suffix, name)),
    capitalize: _.upperFirst(_.camelCase(removeSufix(suffix, name))),
    lowerCase: _.lowerCase(removeSufix(suffix, name)),
    normal: name
});

export const removeSufix = (suffix: string, value: string) => {
    return value.replace(suffix, '');
};

export const filterInput = (suffix: string) => (value: string) => {
    let vs = value.split('/');
    vs = vs.map((v) => _.camelCase(v));
    vs[vs.length - 1] = _.capitalize(vs[vs.length - 1]);
    return (vs.join('/')) + suffix;
};

export const buildFilePath = (targetPath: string, fileName: string) => path.join(__dirname, `/../../${targetPath}`, `${fileName}.ts`);

export const inputIsRequired = (value: any) => !!value;

export const askFileName = async (name: string, suffix: string) => {
    const prompt = inquirer.createPromptModule();
    const prompts = await prompt([
        {
            type: 'input',
            name: 'name',
            message: `Enter the name of the ${name}:`,
            filter: filterInput(suffix),
            validate: inputIsRequired
        }
    ]);
    const amount = prompts.name.split('/').length - 1;
    prompts.deepness = '';
    _.times(amount, () => prompts.deepness += '../');
    return prompts;
};

export const existsFile = async (path: string, stop: boolean = false) => {
    const prompt = inquirer.createPromptModule();
    return new Promise((resolve, reject) => {
        fs.exists(path, async (exists) => {

            if (exists) {
                const answer = await prompt([
                    {
                        type: 'confirm',
                        name: 'override',
                        message: 'Override file?',
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
