/**
 * AbstractMakeCommand
 * -------------------------------------
 *
 */
import * as _ from 'lodash';
import { writeTemplate } from './lib/template';
import { askFileName, buildFilePath, existsFile, parseName, updateTargets } from './lib/utils';

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

    static command = 'make:command';
    static description = 'description';

    public context: any;
    public type = 'Type';
    public suffix = 'Suffix';
    public prefix = '';
    public template = 'template.hbs';
    public target = 'api/target/path';
    public updateTargets = true;

    static async action(command: MakeCommand): Promise<void> {
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

    constructor(context?: any) {
        this.context = _.cloneDeep(context);
    }

    public async run(): Promise<void> {
        this.context = await askFileName(this.context, this.type, this.suffix, this.prefix);
    }

    public async write(): Promise<void> {
        const filePath = buildFilePath(this.target, this.context.name);
        await existsFile(filePath, true);
        this.context.name = parseName(this.context.name, this.suffix);
        await writeTemplate(this.template, filePath, this.context);
    }

}
