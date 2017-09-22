/**
 * UpdateTargetsCommand
 * -------------------------------------
 *
 * This script reads all the api files and generate the
 * needed ioc targets file.
 */
import * as path from 'path';
import * as _ from 'lodash';
import * as glob from 'glob';
import * as handlebars from 'handlebars';
import { AbstractCommand } from './lib/AbstractCommand';
import { writeTemplate } from './lib/template';
import { existsFile } from './lib/utils';


export class UpdateTargetsCommand extends AbstractCommand {

    public static command = 'update:targets';
    public static description = 'Generate new controller';

    public template = 'targets.hbs';
    public targetFile = 'Targets.ts';

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
            let json = JSON.stringify(c, null, 4) || '{}';
            let jsonLines = json.split('\n');
            jsonLines = jsonLines.map(line => `    ${line}`);
            json = jsonLines.join('\n');
            return json.replace(/\"([^(\")"]+)\":/g, '$1:').replace(/"/g, '\'');
        });

        const filepath = path.join(__dirname.replace('console', 'constants'), this.targetFile);
        await existsFile(filepath, true);
        await writeTemplate(this.template, filepath, context);

    }

    private async getFiles(): Promise<string[]> {
        return new Promise<string[]>((resolve, reject) => {
            const filepath = path.normalize(__dirname.replace('console', 'api'));
            glob(`${path.join(filepath, '**', '*.ts')}`, (err: any, files: string[]) => {
                if (err) {
                    return reject(err);
                }
                files = files
                    .map(f => path.normalize(f))
                    .map((f) => f.replace(filepath + path.sep, ''))
                    .map((f) => f.replace('.ts', ''));
                resolve(files);
            });
        });
    }

    private divideFilePath(filePath: string): any {
        const fs = filePath.split(path.sep);
        const key = fs[0];
        fs.splice(0, 1);
        return {
            key,
            path: fs.join(path.sep)
        };
    }

    private parseFilePath(filePath: string): any {
        if (filePath.indexOf(path.sep) !== -1) {
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
