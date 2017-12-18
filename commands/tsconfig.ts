import * as path from 'path';
import * as Chalk from 'chalk';
import * as jsonfile from 'jsonfile';
import * as tsconfig from '../tsconfig.json';


const content: any = tsconfig;
content.include = [
    'src/**/*',
];

const filePath = path.join(process.cwd(), 'tsconfig.build.json');
jsonfile.writeFile(filePath, content, { spaces: 2 }, (err) => {
    if (err === null) {
        const chalk = Chalk.default;
        console.log('👍 ',
            chalk.gray.underline('generated:'),
            chalk.blue.bold('tsconfig.build.json')
        );
    } else {
        console.error('Failed to generate the otsconfig.build.json', err);
        process.exit(1);
    }
});
