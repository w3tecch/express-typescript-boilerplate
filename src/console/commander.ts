/**
 * console.Commander
 * ------------------------------------------------
 *
 * Here you can define your console commands, so you are able
 * to use them in the terminal with 'npm run console <command>'.
 *
 * These console commands can also be accessed in the production
 * environment. For example to import users.
 */

import 'reflect-metadata';
import * as glob from 'glob';
import * as path from 'path';
import * as commander from 'commander';
import * as figlet from 'figlet';
import * as chalk from 'chalk';

// It also loads the .env file into the 'process.env' variable.
import { config } from 'dotenv';
config();

// Configures the logger
import { LoggerConfig } from '../config/LoggerConfig';
new LoggerConfig().configure();

figlet('console', (error: any, data: any) => {
    console.log(chalk.blue(data));
    console.log(chalk.green('➜ ') + chalk.bold(process.argv[2]));
    console.log();

    // Find all command files
    glob(path.join(__dirname, '**/*Command.ts'), (err: any, matches: string[]) => {
        if (err) {
            console.log(err);
            return;
        }
        const files = matches
            .filter(m => m.indexOf('/lib') < 0)
            .map(m => ({
                path: m,
                name: m.replace(__dirname, '').replace('.ts', '').substring(1)
            }));

        const commands = files.map(f => require(f.path)[f.name]);

        commands.forEach((c) => {
            commander
                .command(c.command)
                .description(c.description)
                .action(() => c.action(new c()));
        });

        commander.parse(process.argv);

    });
});
