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

// It also loads the .env file into the 'process.env' variable.
require('dotenv').config();

// Helps to add metadata to classes with annotations
import 'reflect-metadata';

// Configures the logger
import '../config/Logger';

import * as commander from 'commander';

import { DatabaseResetCommand } from './DatabaseResetCommand';
import { MakeModelCommand } from './MakeModelCommand';


/**
 * DatabaseResetCommand
 */
commander
    .command(DatabaseResetCommand.command)
    .description(DatabaseResetCommand.description)
    .action(() => DatabaseResetCommand.action());

commander
    .command(MakeModelCommand.command)
    .description(MakeModelCommand.description)
    .action(() => MakeModelCommand.action());


commander.parse(process.argv);
