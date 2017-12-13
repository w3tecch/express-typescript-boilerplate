import * as path from 'path';
import * as jsonfile from 'jsonfile';
import * as tsconfig from '../../tsconfig.json';


const content: any = tsconfig;
content.include = [
    'src/**/*',
];

const filePath = path.join(process.cwd(), 'tsconfig.build.json');
jsonfile.writeFile(filePath, content, { spaces: 2 }, (err) => {
    if (err === null) {
        console.log('Successfully generated tsconfig.build.json form the .env file');
    } else {
        console.error('Failed to generate the otsconfig.build.json', err);
    }
});
