/**
 * MakeMigrationCommand
 * -------------------------------------
 *
 */
import * as _ from 'lodash';
import * as inquirer from 'inquirer';
import { AbstractMakeCommand } from './lib/AbstractMakeCommand';
import { inputIsRequired } from './lib/utils';


export class MakeMigrationCommand extends AbstractMakeCommand {

    public static command = 'make:migration';
    public static description = 'Generate new migration';

    public target = 'database/migrations';
    public type = 'Migration';
    public suffix = '';
    public template = 'migration.hbs';
    public updateTargets = false;

    public async run(): Promise<void> {
        if (this.context && this.context.tableName) {
            this.context.name = `${this.getTimestamp()}_create_${_.snakeCase(this.context.tableName)}_table`;

        } else {
            const prompt = inquirer.createPromptModule();
            const prompts = await prompt([
                {
                    type: 'input',
                    name: 'name',
                    message: `Enter the name of the ${this.type}:`,
                    filter: v => _.snakeCase(v),
                    validate: inputIsRequired
                }
            ]);
            this.context = { ...(this.context || {}), ...prompts };
            this.context.name = `${this.getTimestamp()}_${prompts.name}`;
        }

    }

    private getTimestamp(): string {
        const today = new Date();
        const formatNumber = (n: number) => (n < 10) ? `0${n}` : `${n}`;
        let timestamp = `${today.getFullYear()}`;
        timestamp += `${formatNumber(today.getMonth())}`;
        timestamp += `${formatNumber(today.getDay())}`;
        timestamp += `${formatNumber(today.getHours())}`;
        timestamp += `${formatNumber(today.getMinutes())}`;
        timestamp += `${formatNumber(today.getSeconds())}`;
        return timestamp;
    }

}
