import 'reflect-metadata';

export * from './FactoryInterface';
export * from './EntityFactoryInterface';
export * from './SeedsInterface';
export * from './Factory';

import * as path from 'path';
import * as glob from 'glob';
import * as commander from 'commander';
import * as Chalk from 'chalk';
import { Factory } from './Factory';

// Get executiuon path to look from there for seeds and factories
const runDir = process.cwd();

// Cli helper
commander
    .version('0.0.0')
    .description('Run database seeds of your project')
    .option('-L, --logging', 'enable sql query logging')
    .option('--factories <path>', 'add filepath for your factories')
    .option('--seeds <path>', 'add filepath for your seeds')
    .option('--config <filepath>', 'add filepath to your database config (must be a json)')
    .parse(process.argv);

// Get cli parameter for a different factory path
const factoryPath = (commander.factories)
    ? commander.factories
    : 'src/database/';

// Get cli parameter for a different seeds path
const seedsPath = (commander.seeds)
    ? commander.seeds
    : 'src/database/seeds/';

// Search for seeds and factories
glob(path.join(runDir, factoryPath, '**/*Factory{.js,.ts}'), (errFactories: any, factories: string[]) => {
    glob(path.join(runDir, seedsPath, '*{.js,.ts}'), (errSeeds: any, seeds: string[]) => {
        const log = console.log;
        const chalk = Chalk.default;

        log(chalk.bold('seeds'));
        log('🔎 ', chalk.gray.underline(`found:`),
            chalk.blue.bold(`${factories.length} factories`, chalk.gray('&'), chalk.blue.bold(`${seeds.length} seeds`)));

        for (const factory of factories) {
            require(factory);
        }

        for (const seed of seeds) {
            const seedFile: any = require(seed);

            try {
                let className = seed.split('/')[seed.split('/').length - 1];
                className = className.replace('.ts', '').replace('.js', '');
                className = className.split('-')[className.split('-').length - 1];
                log(); // Add line break for better visibility in the terminal
                log(chalk.gray.underline(`executing seed:  `), chalk.blue.bold(`${className}`));
                (new seedFile[className]()).seed(Factory.getInstance());
            } catch (error) {
                console.error('Could not run seed ' + seedFile, error);
            }
        }
    });
});

