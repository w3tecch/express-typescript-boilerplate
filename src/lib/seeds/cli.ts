import 'reflect-metadata';
import * as path from 'path';
import * as glob from 'glob';
import * as commander from 'commander';
import * as Chalk from 'chalk';
import { Connection } from 'typeorm';
import { Factory } from './Factory';
import { getConnection } from './connection';


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

        // Status logging to print out the amount of factories and seeds.
        log(chalk.bold('seeds'));
        log('🔎 ', chalk.gray.underline(`found:`),
            chalk.blue.bold(`${factories.length} factories`, chalk.gray('&'), chalk.blue.bold(`${seeds.length} seeds`)));

        // Initialize all factories
        for (const factory of factories) {
            require(factory);
        }

        // Get typeorm database connection and pass them to the factory instance
        getConnection().then((connection: Connection) => {
            const factory = Factory.getInstance();
            factory.setConnection(connection);

            // Initialize and seed all seeds.
            const queue: Array<Promise<void>> = [];
            for (const seed of seeds) {
                try {
                    const seedFile: any = require(seed);
                    let className = seed.split('/')[seed.split('/').length - 1];
                    className = className.replace('.ts', '').replace('.js', '');
                    className = className.split('-')[className.split('-').length - 1];
                    log('\n' + chalk.gray.underline(`executing seed:  `), chalk.green.bold(`${className}`));
                    queue.push((new seedFile[className]()).seed(factory));
                } catch (error) {
                    console.error('Could not run seed ' + seed, error);
                }
            }

            // Promise to catch the end for termination and logging
            Promise
                .all(queue)
                .then(() => {
                    log('\n👍 ', chalk.gray.underline(`finished seeding`));
                    process.exit(0);
                })
                .catch((error) => {
                    console.error('Could not run seed ' + error);
                    process.exit(1);
                });

        }).catch((error) => {
            console.error('Could not connection to database ' + error);
            process.exit(1);
        });
    });
});
