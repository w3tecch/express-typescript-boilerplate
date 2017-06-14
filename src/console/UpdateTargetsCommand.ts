/**
 * UpdateTargetsCommand
 * -------------------------------------
 *
 * This script reads all the api files and generate the
 * needed ioc targets file.
 */
import * as _ from 'lodash';
import * as glob from 'glob';
import * as handlebars from 'handlebars';
import { writeTemplate } from './lib/template';
import { existsFile } from './lib/utils';


export class UpdateTargetsCommand {

    static command = 'update:targets';
    static description = 'Generate new controller';
    static template = 'targets.hbs';
    static targetFile = 'Targets.ts';

    static async action(): Promise<void> {
        try {
            const command = new UpdateTargetsCommand();
            await command.run();
            process.exit(0);
        } catch (e) {
            process.exit(1);
        }
    }

    public async run(): Promise<void> {
        const files = await this.getFiles();

        let context = {};
        files.forEach((filePath) => {
            const obj = this.divideFilePath(filePath);
            const tmpContext = {};
            tmpContext[obj.key] = this.parseFilePath(obj.path);
            context = _.merge(context, tmpContext);
        });

        handlebars.registerHelper('object', (c) => {
            const json = JSON.stringify(c, null, 4) || '{}';
            return json.replace(/\"([^(\")"]+)\":/g, '$1:').replace(/"/g, '\'');
        });

        const path = __dirname.replace('console', 'constants') + `/${UpdateTargetsCommand.targetFile}`;
        await existsFile(path, true);
        await writeTemplate(UpdateTargetsCommand.template, path, context);

    }

    private async getFiles(): Promise<string[]> {
        return new Promise<string[]>((resolve, reject) => {
            const path = __dirname.replace('console', 'api');
            glob(`${path}/**/*.ts`, (err: any, files: string[]) => {
                if (err) {
                    return reject(err);
                }
                files = files
                    .map((f) => f.replace(path + '/', ''))
                    .map((f) => f.replace('.ts', ''));

                resolve(files);
            });
        });
    }

    private divideFilePath(filePath: string): any {
        const fs = filePath.split('/');
        const key = fs[0];
        fs.splice(0, 1);
        return {
            key: key,
            path: fs.join('/')
        };
    }

    private parseFilePath(filePath: string): any {
        if (filePath.indexOf('/') !== -1) {
            const obj = this.divideFilePath(filePath);
            return {
                [obj.key]: this.parseFilePath(obj.path)
            };
        } else {
            return {
                [filePath]: filePath
            };
        }
    }

}
