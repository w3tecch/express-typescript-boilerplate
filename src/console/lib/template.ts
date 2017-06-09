import * as fs from 'fs';
import * as path from 'path';
import * as handlebars from 'handlebars';


export const writeTemplate = async (tempFile: string, path: string, context: any): Promise<any> => {
    const template = await loadTemplate(tempFile);
    const content = handlebars.compile(template)(context);
    return new Promise((resolve, reject) => {
        fs.writeFile(path, content, (err: any) => {
            if (err) {
                return reject(err);
            }
            resolve();
        });

    });
};

export const loadTemplate = async (file: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname, `../templates/${file}`), { encoding: 'utf-8' }, (err: any, content: any) => {
            if (err) {
                return reject(err);
            }
            resolve(content);
        });
    });
};
