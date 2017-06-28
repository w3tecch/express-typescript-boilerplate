import * as fs from 'fs';
import * as path from 'path';
import * as mkdirp from 'mkdirp';
import * as handlebars from 'handlebars';


export const loadTemplate = async (file: string, stop: boolean = false): Promise<any> => {
    return new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname, `../templates/${file}`), { encoding: 'utf-8' }, (err: any, content: any) => {
            if (err) {
                console.log(err);
                if (stop) {
                    process.exit(1);
                }
                return reject(err);
            }
            resolve(content);
        });
    });
};

export const writeTemplate = async (tempFile: string, filePath: string, context: any): Promise<any> => {
    await syncFolder(filePath);
    await syncTemplate(filePath, tempFile, context);
    console.log('File created in: ' + filePath);
};

const syncFolder = (filePath: string) => {
    return new Promise((resolve, reject) => {
        mkdirp(path.dirname(filePath), (err) => {
            if (err) {
                if (stop) {
                    console.log(err);
                    process.exit(1);
                }
                return reject(err);
            }
            resolve();
        });
    });
};

const syncTemplate = async (filePath: string, tempFile: string, context: any) => {
    const template = await loadTemplate(tempFile);
    const content = handlebars.compile(template)(context);
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, content, (err: any) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            resolve();
        });

    });
};
