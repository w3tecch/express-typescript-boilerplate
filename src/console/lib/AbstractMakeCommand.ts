/**
 * AbstractMakeCommand
 * -------------------------------------
 *
 */
import * as _ from 'lodash';
import * as path from 'path';
import * as inquirer from 'inquirer';

import { writeTemplate } from './template';
import { existsFile, parseName, updateTargets, inputIsRequired } from './utils';

export interface MakeCommand {
    context: any;
    type: string;
    suffix: string;
    template: string;
    target: string;
    updateTargets: boolean;

    run(): Promise<void>;
    write(): Promise<void>;
}

export class AbstractMakeCommand {

    public static command = 'make:command';
    public static description = 'description';

    public static async action(command: MakeCommand): Promise<void> {
        try {
            await command.run();
            await command.write();
            if (command.updateTargets) {
                await updateTargets();
            }
            process.exit(0);
        } catch (e) {
            process.exit(1);
        }
    }

    public context: any;
    public type = 'Type';
    public suffix = 'Suffix';
    public prefix = '';
    public template = 'template.hbs';
    public target = 'api/target/path';
    public updateTargets = true;
    public isTest = false;

    constructor(context?: any) {
        this.context = _.cloneDeep(context);
    }

    public async run(): Promise<void> {
        this.context = await this.askFileName(this.context, this.type, this.suffix, this.prefix);
    }

    public async write(): Promise<void> {
        const filePath = this.buildFilePath(this.target, this.context.name, this.isTest);
        await existsFile(filePath, true, this.isTest);
        this.context.name = parseName(this.context.name, this.suffix);
        await writeTemplate(this.template, filePath, this.context);
    }

    public buildFilePath = (targetPath: string, fileName: string, isTest = false, extension = '.ts') => {
        if (isTest) {
            return path.join(__dirname, `/../../../test${targetPath}`, `${fileName}${extension}`);
        } else {
            return path.join(__dirname, `/../../${targetPath}`, `${fileName}${extension}`);
        }
    }

    public parseName(suffix: string = '', prefix: string = ''): (name: string) => string {
        return (name: string) => {
            let ns = name.split('/');
            ns = ns.map((v) => _.camelCase(v));
            ns[ns.length - 1] = _.upperFirst(ns[ns.length - 1]);
            return (ns.join('/')) + prefix + suffix;
        };
    }

    public async askFileName(context: any, name: string, suffix: string, prefix: string): Promise<any> {
        const nameParser = this.parseName(suffix, prefix);
        if (context === undefined || context.name === undefined) {
            const prompt = inquirer.createPromptModule();
            context = await prompt([
                {
                    type: 'input',
                    name: 'name',
                    message: `Enter the name of the ${name}:`,
                    filter: nameParser,
                    validate: inputIsRequired
                }
            ]);
            const amount = context.name.split('/').length - 1;
            context.deepness = '';
            _.times(amount, () => context.deepness += '../');
        } else {
            context.name = nameParser(context.name);
        }
        return context;
    }

}
