/**
 * UpdateTargetsCommand
 * -------------------------------------
 *
 */
import * as _ from 'lodash';
// import * as fs from 'fs';
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
            await UpdateTargetsCommand.run();
            process.exit(0);
        } catch (e) {
            process.exit(1);
        }
    }

    static async getFiles(): Promise<string[]> {
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

    static async run(): Promise<void> {
        const files = await UpdateTargetsCommand.getFiles();

        let context = {};
        files.forEach((filePath) => {
            const obj = UpdateTargetsCommand.divideFilePath(filePath);
            const tmpContext = {};
            tmpContext[obj.key] = UpdateTargetsCommand.parseFilePath(obj.path);
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

    static divideFilePath(filePath: string): any {
        const fs = filePath.split('/');
        const key = fs[0];
        fs.splice(0, 1);
        return {
            key: key,
            path: fs.join('/')
        };
    }

    static parseFilePath(filePath: string): any {
        if (filePath.indexOf('/') !== -1) {
            const obj = UpdateTargetsCommand.divideFilePath(filePath);
            return {
                [obj.key]: UpdateTargetsCommand.parseFilePath(obj.path)
            };
        } else {
            return {
                [filePath]: filePath
            };
        }
    }

}
